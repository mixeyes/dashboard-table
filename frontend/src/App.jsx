import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Dashboard } from './pages/Dashboard';

const defaultTheme = createTheme();

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <Dashboard />
  </ThemeProvider>
);

export default App;
