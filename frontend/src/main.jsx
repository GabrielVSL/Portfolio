import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Novo componente App com estrutura Long-Scroll
import './index.css' // <-- ESSA É A LINHA QUE TRAZ A MÁGICA DO TAILWIND
import { LanguageProvider } from './contexts/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)