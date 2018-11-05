import React, { Component } from 'react';
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
  return { id, name, wkn, current, chartUrl, symbol };
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
      showGraph: false,
      currentGraph: null, // Maybe usefull for the clicked row
      error: 0,
    }
    this.handleMiniGraphClick = this.handleMiniGraphClick.bind(this); // Maybe usefull for the clicked row
  }
  handleClickAway = (e) => {
    console.log(e.target.className);
    if (e.target.className === 'chart-mini-image') {
      return;
    }
    this.setState({
      showGraph: false,
    });
  };
  handleMiniGraphClick(e, row) {
    // Only  Show Grpah wenn not cllickt on the mini graph and if it is open
    // then close graph
    if (this.state.showGraph === true && e.target.className === 'chart-mini-image') {
      this.setState({
        showGraph: false,
      });
      return;
    }

    let symbol = row.symbol;

    this.setState({isLoading: true});
    axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/1y`)
      .then(res => {
        const stockData = res.data;

        let parsedData = stockData.map((data) => {
          return [dayjs(data.date).valueOf(), data.open, data.high, data.low, data.close]
        })

        let parsedVol = stockData.map((data) => {
          return [dayjs(data.date).valueOf(), data.volume]
        })

        this.setState({
          showGraph: true,
          isLoading: false,
          chartOptions: {
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
            title: {
              text: 'Apple'
            },
            series: [
              {
                name: 'Apple',
                data: parsedData,
                tooltip: {
                  valueDecimals: 2
                },
              }, {
                type: 'column',
                name: 'Volume',
                data: parsedVol,
                yAxis: 1
              }
            ]
          }
        });
      })
  }

  render() {
    return (
      <div className="App">
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
                        {this.state.showGraph ? (
                          <div className="popup-graph">
                            <ClickAwayListener onClickAway={this.handleClickAway}>
                              <Paper elevation={3}>
                                <StockChart
                                  key={row.id}
                                  highcharts={Highcharts}
                                  options={this.state.chartOptions} />
                              </Paper>
                            </ClickAwayListener>
                          </div>
                        ) : ('')}
                        {this.state.isLoading ? (
                          <div className="chart-icon">
                            <CircularProgress key={row.id} className="loader" size={30} />
                          </div>
                        ) : (
                            <img
                              className="chart-mini-image"
                              key={row.id}
                              onClick={(e) => this.handleMiniGraphClick(e, row)}
                              src={row.chartUrl} alt="logo" />
                        )}
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
