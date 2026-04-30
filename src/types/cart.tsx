import type { MenuItem } from './Menu'


// one row in the cart
export interface CartItem {
  menuItem: MenuItem
  quantity: number
  notes?: string       
}

//full cart
export interface Cart {
  items: CartItem[]
}