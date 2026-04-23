import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';

const container = document.getElementById('root')!;

if (!(window as any).__reactRoot) {
  (window as any).__reactRoot = createRoot(container);
}

(window as any).__reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
