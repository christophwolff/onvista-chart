import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock'
import StockChart from './components/StockChart'
import StocksTableRow from './components/StocksTableRow'

// import StocksTable from './components/StocksTable'
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchStocks, fetchStockGraphData } from './api'

import dayjs from 'dayjs'

import chartConfig from './config/chartConfig'
import stocksConfig from './config/stocks'
import { offset } from './utils/calculations'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...chartConfig,
            stocks: []
        }
    }

   componentDidMount () {
        let stocksToQuery = stocksConfig.toString();
        fetchStocks(stocksToQuery, 'quote', '1y').then((stocks) => {
           this.setState({
               ...this.state.stocks,
               stocks: Object.values(stocks)
           });
        })
    }

    handleClickAway = (e) => {
        this.setState({
            chartsOptions: {
                ...this.state.chartsOptions,
                series: null,
            },
            showGraph: null
        });
    };

    handleMiniGraphClick(e, stock) {
        if (this.state.showGraph === stock.quote.symbol) {
            this.setState({
                showGraph: null,
                chartsOptions: {
                    ...this.state.chartsOptions,
                    series: null
                }
            });
            return;
        }
        this.setState({
            isLoading: stock.quote.symbol,
            showGraph: stock.quote.symbol,
            chartStyle: {
                top: offset(e.target).top,
                left: offset(e.target).left - 400,
            },
            chartsOptions: {
                ...this.state.chartsOptions,
                series: [],
                title: {
                    text: stock.quote.companyName,
                },
            }
        }, () => {
            setTimeout(() => {
                fetchStockGraphData(stock.quote.symbol)
                    .then(stockData => {

                         this.setState({
                            showGraph: stock.quote.symbol,
                            isLoading: false,
                            chartsOptions: {
                                ...this.state.chartsOptions,
                                title: {
                                    text: stock.quote.companyName,
                                },
                                series: [
                                    {
                                        name: stock.quote.companyName,
                                        data: stockData.map((data) => {
                                            return [dayjs(data.date).valueOf(), data.open, data.high, data.low, data.close]
                                        }),
                                        tooltip: {
                                            valueDecimals: 2
                                        },
                                    }, {
                                        type: 'column',
                                        name: 'Volume',
                                        data: stockData.map((data) => {
                                            return [dayjs(data.date).valueOf(), data.volume]
                                        }),
                                        yAxis: 1
                                    }
                                ]
                            }
                        });
                    })
            }, 200);

        });
    }

    render() {
        return (
            <div className="App">
                {this.state.isLoading || this.state.showGraph ?
                <Paper className="popup-graph" style={this.state.chartStyle} elevation={3}>
                    <div className="graph-wrapper">
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                            {this.state.isLoading ?
                                <div className="loader">
                                    <CircularProgress className="loader" size={30} />
                                </div>
                                :
                                <div><StockChart
                                    loading={!!this.state.isLoading}
                                    highcharts={Highcharts}
                                    options={this.state.chartsOptions} />
                                </div>
                            }
                        </ClickAwayListener>
                    </div>
                </Paper> : null }

                <AppBar position="static">
                    <Typography variant="h2" color="inherit">
                        Musterdepot
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        Inline-Chart Demo (Reactjs)
                    </Typography>
                </AppBar>
                <div className="content">
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Symbol</TableCell>
                                    <TableCell>price (open)</TableCell>
                                    <TableCell>Chart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.stocks.map(stock => {
                                    return (
                                        <StocksTableRow
                                            key={stock.quote.symbol}
                                            handleClick={(e) => this.handleMiniGraphClick(e, stock)}
                                            stock={stock}></StocksTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default App;
