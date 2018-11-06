import React, {Component} from 'react';

import HighchartsReact from 'highcharts-react-official'

export default class StockChart extends Component {

    constructor(props) {
        super(props)
        console.log(props);

        if(this.chart) {
            this.chart.chart.showLoading()
        }
        if (props.loading && this.chart) {
            this.chart.chart.showLoading()
        }
        if (!props.loading && this.chart) {
            this.chart.chart.hideLoading()
            this.chart.chart.redraw();
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.chart) {
            this.chart.chart.showLoading()
        }
        if (newProps.loading && this.chart) {
            this.chart.chart.showLoading()
        }
        if (!newProps.loading && this.chart) {
            this.chart.chart.hideLoading()
            this.chart.chart.redraw();
        }
    }

    render() {
        let {options, highcharts} = this.props;
        return <HighchartsReact
            ref={(chart) => this.chart = chart}
            highcharts={highcharts}
            constructorType={'stockChart'}
            options={options}
        />
    }
}