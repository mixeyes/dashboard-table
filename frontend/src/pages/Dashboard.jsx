import React, { useState, useEffect, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import { DataTable } from '../components';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { getProductList, updateProduct } from '../services';
import {
  TableLabel,
  ImageContainer,
  FilterContainer,
  ChartContainer,
} from '../components';
import { createData, stableSort, getComparator } from '../utils';

export const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [tableSize, setTableSize] = useState({ width: 0, height: 0 });
  const [isFilterDisplayed, setIsFilterDisplayed] = useState(false);
  const [filters, setFilters] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('productName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedImg, setSelectedImg] = useState({
    id: '',
    isDisplayed: false,
    url: '',
  });

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

  useEffect(() => {
    if (tableRef && headRef) {
      setTableSize({
        width: headRef.current?.offsetWidth || 0,
        height: tableRef.current?.offsetHeight || 0,
      });
    }
  }, [rows]);

  const handleOpenFilter = () => {
    setIsFilterDisplayed(!isFilterDisplayed);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setSelectedImg({ isDisplayed: false });
  };

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleUpdateProduct = async (product) => {
    const newProd = await updateProduct(product);
    setRows(() => newProd.products.map((item) => createData(item)));
  };

  const openImg = (url, id) => {
    if (id === selectedImg.id) {
      setSelectedImg({ isDisplayed: !selectedImg.isDisplayed });
    } else {
      setSelectedImg({ isDisplayed: true, url, id });
    }
  };

  return (
    <main>
      <Box sx={{ width: '100%', paddingTop: '3vw' }}>
        <ChartContainer data={rows} />
        <Paper sx={{ width: '100vw' }}>
          <TableLabel headRef={headRef} openFilters={handleOpenFilter} />
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
            <DataTable
              rows={visibleRows}
              updateProduct={handleUpdateProduct}
              tableRef={tableRef}
              tableWidth={selectedImg.isDisplayed ? '75%' : '100%'}
              order={order}
              orderBy={orderBy}
              openImg={openImg}
            />
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
