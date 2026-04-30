import { NavLink } from 'react-router-dom'
import '../style/NavBar.css'
import type { Cart, CartItem } from '../types/cart'

type NavBarProps = {
  cart: Cart
}

export function NavBar({ cart }: NavBarProps) {
  const itemCount = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0,
  )

  return (
    <nav className="navbar">
      <div className="navbar__brand">Dinner App</div>
      <div className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/checkout">Checkout ({itemCount})</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  )
}