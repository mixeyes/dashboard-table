import React, { useState, useEffect, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { TableHeader } from './TableHeader';
import { HeadRow } from './HeadRow';
import { getProductList } from '../../services';
import { createData, stableSort, getComparator } from '../../utils';
import { ImageContainer } from '../ImageContainer';
import { FilterContainer } from '../FilterContainer';

export const DataTable = () => {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('productName');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedImg, setSelectedImg] = useState({
    id: '',
    isDisplayed: false,
    url: '',
  });
  const [tableSize, setTableSize] = useState({ width: 0, height: 0 });
  const [isFilterDisplayed, setIsFilterDisplayed] = useState(false);
  const [filters, setFilters] = useState(null);
  const tableRef = useRef(null);
  const headRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { products } = await getProductList(filters);
      setRows(products.map((item) => createData(item)));
      if (tableRef && headRef) {
        setTableSize({
          width: headRef.current?.offsetWidth || 0,
          height: tableRef.current?.offsetHeight || 0,
        });
      }
    };
    fetchData();
  }, [filters]);

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedImg({ isDisplayed: false });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, url, id) => {
    event.stopPropagation();

    if (id === selectedImg.id) {
      setSelectedImg({ isDisplayed: !selectedImg.isDisplayed });
    } else {
      setSelectedImg({ isDisplayed: true, url, id });
    }
    console.log(JSON.stringify(tableSize));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleOpenFilter = () => {
    setIsFilterDisplayed(!isFilterDisplayed);
  };

  return (
    <main>
      <Box sx={{ width: '100%', paddingTop: '3vw' }}>
        <Paper sx={{ width: '100vw' }}>
          <TableHeader headRef={headRef} openFilters={handleOpenFilter} />
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              p: '2em',
            }}
          >
            {isFilterDisplayed && (
              <FilterContainer
                filtersChange={setFilters}
                width={tableSize.width / 4}
              />
            )}
            <TableContainer
              ref={tableRef}
              sx={{
                width: selectedImg.isDisplayed ? '75%' : '100%',
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
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.productImg, row.id)
                        }
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
                            onClick={(e) => handleCheck(e, row.id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.productName}
                        </TableCell>
                        <TableCell align="right">{row.company}</TableCell>
                        <TableCell align="right">{row.color}</TableCell>
                        <TableCell align="right">{row.inStock}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.count}</TableCell>
                        <TableCell align="right">{row.reviews}</TableCell>
                        <TableCell align="right">{row.location}</TableCell>
                        <TableCell align="right"></TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            {selectedImg.isDisplayed && (
              <ImageContainer
                imgUrl={selectedImg.url}
                height={tableSize.height}
                width={tableSize.width / 4}
                sx={{ width: '25%' }}
              />
            )}
          </Paper>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </main>
  );
};
