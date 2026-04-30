import type { Cart, CartItem } from '../types/cart'
type CheckoutPageProps = {
  cart: Cart
  updateNotes: (menuItemId: number, notes: string) => void
  clearCart: () => void
}
export function CheckoutPage({ cart, updateNotes, clearCart }: CheckoutPageProps) {
  return <div>Checkout page (placeholder)</div>
}