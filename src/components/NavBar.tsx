import { NavLink } from 'react-router-dom'
import '../style/NavBar.css'

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Dinner App</div>
      <div className="navbar__links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <NavLink to="/orders">Orders</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  )
}