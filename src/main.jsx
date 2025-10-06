import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

import './global.css';
import "./assets/font/hind_400/stylesheet.css";
import "./assets/font/poppins_900/stylesheet.css";
import "./assets/font/poppins_600/stylesheet.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
