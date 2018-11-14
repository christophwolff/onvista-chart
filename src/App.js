import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import StocksTable from "./components/StocksTable";
import { fetchStocks } from './api';
import chartConfig from './config/chartConfig'
import stocksConfig from './config/stocks'
import './App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...chartConfig,
            stocks: [],
            loadingStocks: true
        }
    }

    componentDidMount() {
        let stocksToQuery = stocksConfig.toString();
        fetchStocks(stocksToQuery, 'quote', '1y').then((stocks) => {
            this.setState({
                loadingStocks: false,
                stocks: Object.values(stocks)
            });
        })
    }

    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Typography variant="h2" color="inherit">
                        Stocks
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        Inline-Chart Demo (Reactjs)
                    </Typography>
                </AppBar>
                <div className="content">
                    <Paper>
                        <StocksTable stocks={this.state.stocks} loadingStocks={this.state.loadingStocks}></StocksTable>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default App;
