import React, {Component} from 'react';
import Highcharts from 'highcharts/highstock'
import StockChart from './components/StockChart'
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import dayjs from 'dayjs'

import './App.css';


let id = 0;

function createData(name, wkn, current, chartUrl, symbol) {
    id += 1;
    return {id, name, wkn, current, chartUrl, symbol};
}

// Create a table
const rows = [
    createData('Apple', '865985', 270.17, 'https://x.onvista.de/typ1.chart?ID_NOTATION=9385885&LEGEND=0&FROM=20.09.2018&TO=05.11.2018&colPriceLine=00519e&gfxtools_customer=onvista', 'AAPL'),
    createData('Facebook', 'A1JWVX', 129.61, 'https://x.onvista.de/typ1.chart?ID_NOTATION=9385885&LEGEND=0&FROM=20.09.2018&TO=05.11.2018&colPriceLine=00519e&gfxtools_customer=onvista', 'FB')
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            showGraph: null,
            chartStyle: {
                display: 'none'
            },
            currentGraph: null, // Maybe usefull for the clicked row
            error: 0,
            chartsOptions: {
                xAxis: false,
                yAxis: [{
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'OHLC'
                    },
                    height: '60%',
                    lineWidth: 2,
                    resize: {
                        enabled: true
                    }
                }, {
                    labels: {
                        align: 'right',
                        x: -3
                    },
                    title: {
                        text: 'Volume'
                    },
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2
                }],
                tooltip: {
                    split: true
                },
                series: null
            }
        }
        this.handleMiniGraphClick = this.handleMiniGraphClick.bind(this); // Maybe usefull for the clicked row
    }

    handleClickAway = (e) => {
        this.setState({
            chartsOptions: {
                ...this.state.chartsOptions,
                series: null,
            },
            chartStyle: {
                display: 'none'
            },
            showGraph: null
        });
    };

    offset(el) {
        var rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    handleMiniGraphClick(e, row) {
        // Only  Show Grpah wenn not cllickt on the mini graph and if it is open
        // then close graph
        if (this.state.showGraph === row.id) {
            this.setState({
                showGraph: null,
                chartsOptions: {
                    ...this.state.chartsOptions,
                    series: null
                }
            });
            return;
        }

        console.log(e.target);
        this.setState({
            isLoading: row.id,
            //showGraph: row.id,
            chartStyle: {
                display: 'flex',
                top: this.offset(e.target).top,
                left: this.offset(e.target).left - 400,
            },
            chartsOptions: {
                ...this.state.chartsOptions,
                series: [],
                title: {
                    text: row.name,
                },
            }
        }, () => {
            axios.get(`https://api.iextrading.com/1.0/stock/${row.symbol}/chart/1m`)
                .then(res => {
                    this.setState({
                        showGraph: row.id,
                        isLoading: false,
                        chartStyle: {
                            ...this.state.chartStyle,
                            display: 'block',
                        },
                        chartsOptions: {
                            ...this.state.chartsOptions,
                            title: {
                                text: row.name,
                            },
                            series: [
                                {
                                    name: row.name,
                                    data: res.data.map((data) => {
                                        return [dayjs(data.date).valueOf(), data.open, data.high, data.low, data.close]
                                    }),
                                    tooltip: {
                                        valueDecimals: 2
                                    },
                                }, {
                                    type: 'column',
                                    name: 'Volume',
                                    data: res.data.map((data) => {
                                        return [dayjs(data.date).valueOf(), data.volume]
                                    }),
                                    yAxis: 1
                                }
                            ]
                        }
                    });
                })
        });
    }

    render() {
        return (
            <div className="App">
                {this.state.isLoading || this.state.showGraph ?
                    <Paper className="popup-graph" style={this.state.chartStyle} elevation={3}>
                        <ClickAwayListener onClickAway={this.handleClickAway}>
                            {this.state.isLoading ?
                                <div className="chart-icon">
                                    <CircularProgress className="loader" size={30}/>
                                </div>
                                :
                                <div><StockChart
                                    loading={!!this.state.isLoading}
                                    highcharts={Highcharts}
                                    options={this.state.chartsOptions}/>
                                </div>
                            }
                        </ClickAwayListener>
                    </Paper> : null}
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
                                    <TableCell>WKN</TableCell>
                                    <TableCell>Aktueller Kurs</TableCell>
                                    <TableCell>Chart</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.wkn}</TableCell>
                                            <TableCell>{row.current} $</TableCell>
                                            <TableCell>
                                                <img
                                                    className="chart-mini-image"
                                                    key={row.id}
                                                    onClick={(e) => this.handleMiniGraphClick(e, row)}
                                                    src={row.chartUrl} alt="logo"/>

                                            </TableCell>
                                        </TableRow>
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
