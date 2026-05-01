import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import type { Cart } from './types/cart'
import type { MenuItem } from './types/Menu'
import type { Order } from './types/order'
import { NavBar } from './components/NavBar'
import { Home } from './pages/Home'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderPage } from './pages/OrderPage'
import { LoginPage } from './pages/LoginPage'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState<Cart>({ items: [] })
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  const addToCart = (menuItem: MenuItem) => {
    setCart((prev) => {
      const existing = prev.items.find((ci) => ci.menuItem.id === menuItem.id)
      if (existing) {
        return {
          items: prev.items.map((ci) =>
            ci.menuItem.id === menuItem.id
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci,
          ),
        }
      }
      return { items: [...prev.items, { menuItem, quantity: 1, notes: '' }] }
    })
  }

  const updateNotes = (menuItemId: number, notes: string) => {
    setCart((prev) => ({
      items: prev.items.map((ci) =>
        ci.menuItem.id === menuItemId ? { ...ci, notes } : ci,
      ),
    }))
  }

  const clearCart = () => setCart({ items: [] })

  const handleOrderPlaced = (order: Order) => {
    setLastOrder(order)
    clearCart()
  }

  return (
    <BrowserRouter>
      <NavBar cart={cart} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route
          path="/checkout"
          element={
            <CheckoutPage
              cart={cart}
              updateNotes={updateNotes}
              clearCart={clearCart}
              onOrderPlaced={handleOrderPlaced}
            />
          }
        />
        <Route path="/order/:id" element={<OrderPage allOrders={lastOrder ? [lastOrder] : []} />} />
        
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App