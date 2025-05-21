
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './contexts/ThemeContext'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
