import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStoreContextProvider } from './Store';
import { Theme } from './Common/Theme';

ReactDOM.createRoot(document.querySelector('#root'))
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <GlobalStoreContextProvider>
          <ThemeProvider theme={Theme}>
            <App />
          </ThemeProvider>
        </GlobalStoreContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
