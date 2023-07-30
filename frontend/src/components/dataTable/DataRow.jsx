import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';

export const DataRow = ({
  row,
  checkRow,
  openImg,
  isItemSelected,
  labelId,
  handleBuy,
}) => {
  return (
    <TableRow
      hover
      onClick={(event) => openImg(event, row.productImg, row.id)}
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          role="checkbox"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
          onClick={(e) => checkRow(e, row.id)}
        />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        {row.productName}
      </TableCell>
      <TableCell align="right">{row.company}</TableCell>
      <TableCell align="right">{row.color}</TableCell>
      <TableCell align="right">
        {row.inStock ? 'In stock' : 'Out of stock'}
      </TableCell>
      <TableCell align="right">{row.price}</TableCell>
      <TableCell align="right">{row.count}</TableCell>
      <TableCell align="right">{row.reviews}</TableCell>
      <TableCell align="right">{row.location}</TableCell>
      <TableCell align="right">
        {
          <Button
            onClick={(e) => handleBuy(e, row.id)}
            disabled={!row.inStock}
            variant="contained"
          >
            buy
          </Button>
        }
      </TableCell>
    </TableRow>
  );
};
