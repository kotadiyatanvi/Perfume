import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ModeContextProvider } from './Context/ModelContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ModeContextProvider>
    <App />
  </ModeContextProvider>
)


