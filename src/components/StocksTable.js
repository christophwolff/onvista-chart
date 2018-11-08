import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import StocksTableRow from '../components/StocksTableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

class StocksTable extends Component {
    render() {
        return (
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
                    {this.props.loadingStocks ?
                        <TableRow>
                            <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                                <CircularProgress className="loader" size={30} />
                            </TableCell>
                        </TableRow>
                        : this.props.stocks.map(stock => {
                            return (<StocksTableRow
                                key={stock.quote.symbol}
                                stock={stock} />);
                        })}
                </TableBody>
            </Table>
        );
    }
}

export default StocksTable;