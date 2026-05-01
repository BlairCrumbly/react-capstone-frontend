import type { CartItem } from './cart'

export interface Order {
  id: number
  items: CartItem[]
  subtotal: number
  tax: number
  tip: number
  total: number
  createdAt: string
}

export interface OrderSummary {
  id: number
  ordertime: string | null
  total?: number
}

export interface ServerOrderItem {
  id: number
  orderid: number
  itemid: number
  price: number
  notes?: string
  firstName?: string
}