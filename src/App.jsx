import './App.css'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Checkout from './pages/Checkout'
import ProductPage from './pages/ProductPage'
import Errorpage from './pages/Errorpage'
import Navbar from './components/Navbar'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'

function App() {
  return (
    <div>
      <AuthProvider>
        <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductPage />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  )
}

export default App
