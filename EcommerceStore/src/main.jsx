import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './assets/Components/login.jsx'
import Dashboard from './assets/Components/dashboard.jsx'
import { BrowserRouter, Routes, Route } from "react-router";


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
       <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>,
)
