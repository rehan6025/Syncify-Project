
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Transfer from './pages/Transfer'
import Profile from './pages/Profile'

function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/transfer" element={<Transfer/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
