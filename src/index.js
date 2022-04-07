import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStoreContextProvider } from './Store';
import { AuthContextProvider } from './Auth';
import { Theme } from './Common/Theme';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <GlobalStoreContextProvider>
          <ThemeProvider theme={Theme}>
            <App />
          </ThemeProvider>
        </GlobalStoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
