import React, { Component } from 'react';
import highstock from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import dayjs from 'dayjs'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      showGraph: false,
      error: 0
    }
  }
  componentDidMount() {

  }
  handleMiniGraphClick(e) {
    e.preventDefault();
    if(this.state.showGraph === true) {
      this.setState({showGraph: false});
      return;
    }
    axios.get(`https://api.iextrading.com/1.0/stock/aapl/chart/1y`)
      .then(res => {
        // const stockData = res.data;
        // console.log(stockData);
        // let parsedData = [];
        // parsedData = stockData.map((data) => {

        //   return [dayjs(data.date).format('YYYY/mm/dd'), data.open, data.high, data.low, data.close, data.volume]
        // })
        // console.log(parsedData);

        // this.setState({
        //   chartOptions: {
        //     series: [{
        //       data: parsedData
        //     }]
        //   }
        // });
        this.setState({ showGraph: true })
      })
  }

  render() {
    var chartOptions = {
      title: {
        text: 'My stock chart'
      },
      series: [{
        name: 'S & P 500',
        data: [[1220832000000, 22.56], [1220918400000, 21.67], [1221004800000, 21.66], [1221091200000, 21.81], [1221177600000, 21.28], [1221436800000, 20.05], [1221523200000, 19.98], [1221609600000, 18.26], [1221696000000, 19.16], [1221782400000, 20.13], [1222041600000, 18.72], [1222128000000, 18.12], [1222214400000, 18.39], [1222300800000, 18.85], [1222387200000, 18.32], [1222646400000, 15.04], [1222732800000, 16.24], [1222819200000, 15.59], [1222905600000, 14.3], [1222992000000, 13.87], [1223251200000, 14.02], [1223337600000, 12.74], [1223424000000, 12.83], [1223510400000, 12.68], [1223596800000, 13.8], [1223856000000, 15.75], [1223942400000, 14.87], [1224028800000, 13.99], [1224115200000, 14.56], [1224201600000, 13.91], [1224460800000, 14.06], [1224547200000, 13.07], [1224633600000, 13.84], [1224720000000, 14.03], [1224806400000, 13.77], [1225065600000, 13.16], [1225152000000, 14.27], [1225238400000, 14.94], [1225324800000, 15.86], [1225411200000, 15.37], [1225670400000, 15.28], [1225756800000, 15.86], [1225843200000, 14.76], [1225929600000, 14.16], [1226016000000, 14.03], [1226275200000, 13.7], [1226361600000, 13.54], [1226448000000, 12.87], [1226534400000, 13.78], [1226620800000, 12.89], [1226880000000, 12.59], [1226966400000, 12.84], [1227052800000, 12.33], [1227139200000, 11.5], [1227225600000, 11.8], [1227484800000, 13.28], [1227571200000, 12.97], [1227657600000, 13.57], [1227830400000, 13.24], [1228089600000, 12.7], [1228176000000, 13.21], [1228262400000, 13.7], [1228348800000, 13.06], [1228435200000, 13.43], [1228694400000, 14.25], [1228780800000, 14.29], [1228867200000, 14.03], [1228953600000, 13.57], [1229040000000, 14.04], [1229299200000, 13.54]],
        tooltip: {
          valueDecimals: 2
        }
      }]
    }
    return (
      <div className="App">
        <div className="stockTable">
          <div className="name">
            S &amp; P 500
          </div>
          <div className="name-cell">
            Price
          </div>
          <div className="date-cell">
            Date
          </div>
          <div className="chart-cell">
              {this.state.showGraph ? (

                <div className="popup-graph">
                  <Paper elevation={3}>
                    <HighchartsReact
                      className="popup-graph"
                      highcharts={highstock}
                      constructorType={'stockChart'}
                      options={chartOptions} />
                  </Paper>
                </div>

              ) : ('')}
            <img
              className="chart-icon"
              onClick={(e) => this.handleMiniGraphClick(e)}
              src="https://x.onvista.de/typ1.chart?ID_NOTATION=163500&LEGEND=0&FROM=21.10.2018&TO=03.11.2018&colPriceLine=00519e&gfxtools_customer=onvista" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
