// import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/system';
import { Theme } from './Theme/Theme';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { SnackbarProvider } from 'notistack';
import Dashboard from './Pages/Admin/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={Theme}>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />
          </Routes>
        </ThemeProvider>
      </SnackbarProvider>
    </Router>
  </Provider>
);