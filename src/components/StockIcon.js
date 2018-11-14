import React, { Component } from 'react';
import { fetchSimpleGraphData } from "../api";
import { Sparklines, SparklinesLine } from "react-sparklines";
import CircularProgress from "@material-ui/core/CircularProgress";

class StockIcon extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            loadingMiniGraph: true
        }
    }

    componentWillMount() {

        fetchSimpleGraphData(this.props.stock.quote.symbol, '1y', 10).then(data => {
            let chartArray = data.map((data) => {
                return data.open
            })
            this.setState({ data: chartArray, loadingMiniGraph: false });
        });

    }
    render() {
        return <span className="chart-icon" key={this.props.stock.id} onClick={this.props.onClick}>
            {this.state.loadingMiniGraph ?
                <CircularProgress className="loader" size={10} color="secondary" />
            :
            <Sparklines data={this.state.data}>
                <SparklinesLine color="#B40094" />
            </Sparklines>
            }
          </span>;
    }
}

export default StockIcon;