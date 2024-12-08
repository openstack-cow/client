import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GlobalMessageProvider } from './components/GlobalMessageContext';
import App from './App';
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalMessageProvider>
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </BrowserRouter>
    </GlobalMessageProvider>
  </React.StrictMode>
);
