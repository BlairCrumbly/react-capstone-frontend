import { MenuItemList } from './components/MenuItemList'
import './App.css'
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Home} from './pages/Home'
import {NavBar} from './components/NavBar'
import type { Cart } from './types/cart'

function App() {
    const [cart, setCart] = useState<Cart>({ items: [] })
    const addToCart = (menuItem: MenuItem) => {
      setCart((prev) => {
        const existing = prev.items.find(
          (ci) => ci.menuItem.id === menuItem.id,
        )
        if (existing) {
          return {
            items: prev.items.map((ci) =>
              ci.menuItem.id === menuItem.id
                ? { ...ci, quantity: ci.quantity + 1 }
                : ci,
            ),
          }
        }
        return {
          items: [
            ...prev.items,
            { menuItem, quantity: 1, notes: '' },
          ],
        }
      })
    }

    const updateNotes = (menuItemId: number, notes: string) => {
      setCart((prev) => ({
        items: prev.items.map((ci) =>
          ci.menuItem.id === menuItemId ? { ...ci, notes } : ci,
        ),
      }))
    }

    const clearCart = () => {
      setCart({ items: [] })
    }

  function CheckoutPage() {
  return <div>Checkout page (placeholder)</div>
  }
  function OrdersPage() {
    return <div>Orders page (placeholder)</div>
  }
  function LoginPage() {
    return <div>Login page (placeholder)</div>
  }
  
  
  return(
      <BrowserRouter>
      {/* Navigation */}
      <NavBar cart={cart}/>
      <Routes>
        <Route path="/" element={<Home cart={cart} addToCart={addToCart}/>} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} updateNotes={updateNotes} clearCart={clearCart}/>} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
