// main.jsx — Entry point of our React app
// React mounts the entire app into the <div id="root"> in index.html

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'  // ← Import global styles FIRST
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)