import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import Errorpage from './pages/Errorpage'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
