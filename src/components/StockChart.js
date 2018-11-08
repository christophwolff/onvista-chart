import React, {Component} from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import dayjs from 'dayjs'
import Paper from '@material-ui/core/Paper';
import StockIcon from '../components/StockIcon'
import {fetchStockGraphData} from '../api'

export default class StockChart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            showGraph: false,
            chartStyle: {
                display: 'none'
            },
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
            showGraph: false
        });
    };

    handleMiniGraphClick(e) {
        let {stock} = this.props;
        // Only  Show Grpah wenn not cllickt on the mini graph and if it is open
        // then close graph
        if (this.state.showGraph) { // Not working because of Click away component
            this.setState({
                showGraph: false,
                chartsOptions: {
                    ...this.state.chartsOptions,
                    series: null
                }
            });
            return;
        }

        this.setState({
            isLoading: true,
            chartStyle: {
                display: 'flex',
            }
        });

        fetchStockGraphData(stock.quote.symbol)
            .then(data => {
                this.setState({
                    showGraph: true,
                    isLoading: false,
                    chartStyle: {
                        ...this.state.chartStyle,
                        display: 'block',
                    },
                    chartsOptions: {
                        ...this.state.chartsOptions,
                        title: {
                            text: stock.quote.companyName,
                        },
                        series: [
                            {
                                name: stock.quote.companyName,
                                data: data.map((data) => {
                                    return [dayjs(data.date).valueOf(), data.open, data.high, data.low, data.close]
                                }),
                                tooltip: {
                                    valueDecimals: 2
                                },
                            }, {
                                type: 'column',
                                name: 'Volume',
                                data: data.map((data) => {
                                    return [dayjs(data.date).valueOf(), data.volume]
                                }),
                                yAxis: 1
                            }
                        ]
                    }
                });
            })
    }

    render() {
        return <div style={{position: 'relative'}}>
            <StockIcon
                stock={this.props.stock}
                onClick={this.handleMiniGraphClick.bind(this)}>
            </StockIcon>

            {this.state.isLoading || this.state.showGraph ?
                <Paper className="popup-graph" style={this.state.chartStyle} elevation={3}>
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        {this.state.isLoading ?
                            <div className="chart-icon">
                                <CircularProgress className="loader" size={30}/>
                            </div>
                            :
                            <div><HighchartsReact
                                ref={(chart) => this.chart = chart}
                                highcharts={Highcharts}
                                constructorType={'stockChart'}
                                options={this.state.chartsOptions}
                            />
                            </div>
                        }
                    </ClickAwayListener>
                </Paper> : null
            }
        </div>
    }
}