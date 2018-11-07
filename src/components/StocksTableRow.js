import React, { Component } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockIcon from '../components/StockIcon'

class StocksTableRow extends Component {
    render() {
        return (
            <TableRow key={this.props.stock.quote.symbol}>
                <TableCell component="th" scope="stock">
                    {this.props.stock.quote.companyName}
                </TableCell>
                <TableCell>{this.props.stock.quote.symbol}</TableCell>
                <TableCell>{this.props.stock.quote.open} $</TableCell>
                <TableCell>
                    <StockIcon
                        stock={this.props.stock}
                        onClick={ this.props.handleClick }>
                    </StockIcon>
                </TableCell>
            </TableRow>
        );
    }
}

export default StocksTableRow;