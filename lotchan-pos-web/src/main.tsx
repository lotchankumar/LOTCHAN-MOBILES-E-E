import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Globally disable scrolling on number inputs to prevent accidental value changes
document.addEventListener('wheel', function(event) {
  if (document.activeElement && document.activeElement.type === 'number') {
    (document.activeElement as HTMLElement).blur();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
