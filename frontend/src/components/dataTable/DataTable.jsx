import React, { useState, useEffect, useRef, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { HeadRow } from './HeadRow';
import { DataRow } from './DataRow';
import { arrayOf, string, shape, node, boolean, func } from 'prop-types';

export const DataTable = ({
  rows,
  updateProduct,
  tableRef,
  tableWidth,
  order,
  orderBy,
  openImg,
}) => {
  const [selected, setSelected] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheck = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, url, id) => {
    event.stopPropagation();
    openImg(url, id);
  };

  const handleBuy = (event, id) => {
    event.stopPropagation();
    const product = rows.find((item) => item.id === id);
    product.count -= 1;
    if (!product.count) {
      product.inStock = false;
    }
    updateProduct(product);
  };

  return (
    <TableContainer
      ref={tableRef}
      sx={{
        width: tableWidth,
      }}
    >
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <HeadRow
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
              <DataRow
                key={labelId}
                row={row}
                isItemSelected={isItemSelected}
                labelId={labelId}
                openImg={handleClick}
                checkRow={handleCheck}
                handleBuy={handleBuy}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

DataTable.propTypes = {
  rows: arrayOf(
    shape({
      productName: string,
      company: string,
      color: string,
      inStock: boolean,
      price: number,
      count: number,
      reviews: number,
      location: string,
      productImg: string,
      additional: string,
      id: string,
    }),
  ),
  updateProduct: func,
  tableRef: node,
  tableWidth: string,
  order: string,
  orderBy: string,
  openImg: func,
};
