import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './LandingPage.jsx' // Atualizado para o seu novo nome
import './index.css' // <-- ESSA É A LINHA QUE TRAZ A MÁGICA DO TAILWIND

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
)