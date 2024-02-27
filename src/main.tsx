import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import IntlProvider from './context/IntlContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider>
      <App />
    </IntlProvider>
    
  </React.StrictMode>,
)
