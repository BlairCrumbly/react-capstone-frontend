import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Order } from '../types/order'
import '../style/OrderPage.css'
import type { MenuItem } from '../types/Menu'
import type { CartItem } from '../types/cart'
import type { ServerOrderItem } from '../types/order'
type OrderPageProps = {
  // passed for the just-placed order so we don't need to re-fetch
  allOrders?: Order[]
}

export function OrderPage({ allOrders = [] }: OrderPageProps) {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(
    allOrders.find((o) => o.id === Number(id)) ?? null,
  )
  const [loading, setLoading] = useState(order === null)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  if (order !== null) return

async function loadOrder() {
  try {
    const [orderResp, itemsResp, menuResp] = await Promise.all([
      fetch(`/api/orders/${id}`),
      fetch(`/api/items/order/${id}`),
      fetch(`/api/menuitems`),
    ])

    if (!orderResp.ok) throw new Error(`HTTP ${orderResp.status}`)

    const raw = await orderResp.json()
    const serverItems: ServerOrderItem[] = itemsResp.ok ? await itemsResp.json() : []
    const menuItems: MenuItem[] = menuResp.ok ? await menuResp.json() : []

    // group rows by itemid to reconstruct quantity
    const grouped = serverItems.reduce<Record<number, ServerOrderItem[]>>(
      (acc, si) => {
        acc[si.itemid] = acc[si.itemid] ?? []
        acc[si.itemid].push(si)
        return acc
      }, {}
    )

    const items: CartItem[] = Object.entries(grouped).map(([itemid, rows]) => {
      const menuItem: MenuItem | undefined = menuItems.find((m) => m.id === Number(itemid))  // ← here
      return {
        menuItem: menuItem ?? ({
          id:          Number(itemid),
          name:        `Item #${itemid}`,
          price:       rows[0].price,
          description: '',
          category:    undefined,
          imageUrl:    undefined,
        } as MenuItem),                                                                        // ← and here
        quantity: rows.length,
        notes:    rows[0].notes ?? '',
      }
    })

    const subtotal = items.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0)
    const tax   = raw.tax ?? subtotal * 0.13
    const tip   = raw.tip ?? subtotal * 0.15
    const total = subtotal + tax + tip

    setOrder({
      id:        raw.id,
      items,
      subtotal,
      tax,
      tip,
      total,
      createdAt: raw.ordertime ?? new Date().toISOString(),
    })
  } catch {
    setError('Failed to load order')
  } finally {
    setLoading(false)
  }
}

  loadOrder()
}, [id])

  if (loading) return (
    <div className="order order--empty">
      <p className="order__empty-label">Loading order…</p>
    </div>
  )

  if (error || !order) return (
    <div className="order order--empty">
      <p className="order__empty-label">{error ?? '— order not found —'}</p>
      <button className="order__back" onClick={() => navigate('/orders')}>
        Back to orders
      </button>
    </div>
  )

  const items    = order.items ?? []
  const subtotal = items.reduce((sum, ci) => sum + ci.menuItem.price * ci.quantity, 0)
  const tax      = order.tax   ?? subtotal * 0.13
  const tip      = order.tip   ?? subtotal * 0.15
  const total    = order.total ?? subtotal + tax + tip

  const formatted = new Date(order.createdAt).toLocaleString('en-CA', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="order">
      <div className="order__header">
        <div className="order__badge">✦ Order Confirmed</div>
        <h1 className="order__title">Receipt</h1>
        <p className="order__meta">#{order.id} · {formatted}</p>
      </div>

      <ul className="order__list">
        {items.map((ci) => (
          <li key={ci.menuItem.id} className="order__item">
            <div className="order__item-left">
              <span className="order__item-qty">×{ci.quantity}</span>
              <div>
                <p className="order__item-name">{ci.menuItem.name}</p>
                {ci.notes && <p className="order__item-notes">{ci.notes}</p>}
              </div>
            </div>
            <span className="order__item-price">
              ${(ci.menuItem.price * ci.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="order__summary">
        <div className="order__summary-row">
          <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="order__summary-row">
          <span>Tax</span><span>${tax.toFixed(2)}</span>
        </div>
        <div className="order__summary-row">
          <span>Tip</span><span>${tip.toFixed(2)}</span>
        </div>
        <div className="order__summary-row order__summary-row--total">
          <span>Total Paid</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="order__back" onClick={() => navigate('/orders')}>
        ← Back to orders
      </button>
    </div>
  )
}