import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { LocalStorageProvider } from './context/localStorage'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalStorageProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LocalStorageProvider>
)
