import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalMessageProvider } from './components/GlobalMessageContext';
import App from './App';
import "./global.css";

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalMessageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalMessageProvider>
  </React.StrictMode>
);
