import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {DataTable} from './components/dataTable/DataTable';

const defaultTheme = createTheme();

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <DataTable />
  </ThemeProvider>
);

export default App;
