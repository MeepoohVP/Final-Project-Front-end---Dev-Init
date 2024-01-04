import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Nav from './components/Nav.tsx'
import Loading from './components/Loading.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Loading/>
    <Nav/>
  </React.StrictMode>,
)
