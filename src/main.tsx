import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import SmoothScroll from './components/SmoothScroll';
import { startViewportCssVarsSync } from './lib/syncViewportCssVars';

startViewportCssVarsSync();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SmoothScroll>
      <App />
    </SmoothScroll>
  </StrictMode>,
);
