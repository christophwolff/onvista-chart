import React, {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StockChart from './components/StockChart';

import './App.css';


let id = 0;

function createData(name, wkn, current, chartUrl, symbol) {
    id += 1;
    return {id, name, wkn, current, chartUrl, symbol};
}

// Create a table
const rows = [
    createData('Apple', '865985', 270.17, 'https://x.onvista.de/typ1.chart?ID_NOTATION=9385885&LEGEND=0&FROM=20.09.2018&TO=05.11.2018&colPriceLine=00519e&gfxtools_customer=onvista', 'AAPL'),
    createData('Facebook', 'A1JWVX', 129.61, 'https://x.onvista.de/typ1.chart?ID_NOTATION=A1JWVX&LEGEND=0&FROM=20.09.2018&TO=05.11.2018&colPriceLine=00519e&gfxtools_customer=onvista', 'FB')
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: 0,
        }
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
                                                <StockChart stock={row}/>
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
