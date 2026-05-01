import { useNavigate } from 'react-router-dom'
import type { Cart, CartItem } from '../types/cart'
import type { Order } from '../types/order'
import type { CreditCardData } from '../components/CreditCardForm'
import { CreditCardForm } from '../components/CreditCardForm'
import '../style/CheckoutPage.css'

const TAX_RATE = 0.13
const TIP_RATE = 0.15

type CheckoutPageProps = {
  cart: Cart
  updateNotes: (menuItemId: number, notes: string) => void
  clearCart: () => void
  onOrderPlaced: (order: Order) => void
}

export function CheckoutPage({ cart, updateNotes, clearCart, onOrderPlaced }: CheckoutPageProps) {
  const navigate = useNavigate()

  const subtotal = cart.items.reduce(
    (sum, ci) => sum + ci.menuItem.price * ci.quantity, 0,
  )
  const tax   = subtotal * TAX_RATE
  const tip   = subtotal * TIP_RATE
  const total = subtotal + tax + tip

  const handlePayment = async (cardData: CreditCardData) => {
    const payload = {
      items: cart.items.map((ci) => ({
        menuItemId: ci.menuItem.id,
        quantity: ci.quantity,
        notes: ci.notes,
      })),
      payment: {
        pan: cardData.pan.replace(/\s/g, ''),
        expiryMonth: cardData.expiryMonth,
        expiryYear: cardData.expiryYear,
        cvv: cardData.cvv,
      },
    }

    const resp = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!resp.ok) throw new Error(`Order failed: ${resp.status}`)

    const raw = await resp.json()

    // Server only returns id + metadata — compute totals from cart
    const order: Order = {
      id:        raw.id,
      items:     cart.items,
      subtotal,
      tax,
      tip,
      total,
      createdAt: raw.ordertime ?? new Date().toISOString(),
    }

    onOrderPlaced(order)
    navigate(`/order/${raw.id}`)
  }

  if (cart.items.length === 0) {
    return (
      <div className="checkout checkout--empty">
        <p className="checkout__empty-label">— your cart is empty —</p>
      </div>
    )
  }

  return (
    <div className="checkout">
      <h1 className="checkout__title">Your Order</h1>

      <ul className="checkout__list">
        {cart.items.map((ci: CartItem) => (
          <li key={ci.menuItem.id} className="checkout__item">
            <div className="checkout__item-header">
              <div className="checkout__item-meta">
                <span className="checkout__item-qty">×{ci.quantity}</span>
                <span className="checkout__item-name">{ci.menuItem.name}</span>
              </div>
              <span className="checkout__item-price">
                ${(ci.menuItem.price * ci.quantity).toFixed(2)}
              </span>
            </div>
            <textarea
              className="checkout__notes"
              placeholder="Special instructions…"
              value={ci.notes ?? ''}
              rows={2}
              onChange={(e) => updateNotes(ci.menuItem.id, e.target.value)}
            />
          </li>
        ))}
      </ul>

      <div className="checkout__footer">
        <div className="checkout__total-row">
          <span className="checkout__total-label">Subtotal</span>
          <span className="checkout__total-amount--small">${subtotal.toFixed(2)}</span>
        </div>
        <div className="checkout__total-row">
          <span className="checkout__total-label">Tax (13%)</span>
          <span className="checkout__total-amount--small">${tax.toFixed(2)}</span>
        </div>
        <div className="checkout__total-row">
          <span className="checkout__total-label">Tip (15%)</span>
          <span className="checkout__total-amount--small">${tip.toFixed(2)}</span>
        </div>
        <div className="checkout__total-row checkout__total-row--final">
          <span className="checkout__total-label">Total</span>
          <span className="checkout__total-amount">${total.toFixed(2)}</span>
        </div>
        <button className="checkout__btn checkout__btn--clear" onClick={clearCart}>
          Clear cart
        </button>
      </div>

      <CreditCardForm onSubmit={handlePayment} />
    </div>
  )
}