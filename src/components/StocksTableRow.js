import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockChart from "./StockChart";

class StocksTableRow extends Component {
    render() {
        return (
            <TableRow>
                <TableCell component="th" scope="stock">
                    {this.props.stock.quote.companyName}
                </TableCell>
                <TableCell>{this.props.stock.quote.symbol}</TableCell>
                <TableCell>{this.props.stock.quote.open} $</TableCell>
                <TableCell>
                    <StockChart stock={this.props.stock}/>
                </TableCell>
            </TableRow>
        );
    }
}

export default StocksTableRow;