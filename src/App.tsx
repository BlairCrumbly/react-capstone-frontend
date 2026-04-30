import { MenuItemList } from './components/MenuItemList'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Home} from './pages/Home'
import {NavBar} from './components/NavBar'
function App() {
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
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
