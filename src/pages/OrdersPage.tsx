import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { OrderSummary } from '../types/order'
import '../style/OrdersPage.css'

export function OrdersPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOrders() {
      try {
        const resp = await fetch('/api/orders')
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data: OrderSummary[] = await resp.json()
        console.log('All orders from server:', data)
        const validOrders = data.filter((o) => o.ordertime !== null)
        console.log('Valid orders after filter:', validOrders)
        setOrders(validOrders)
      } catch {
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  if (loading) return (
    <div className="orders orders--empty">
      <p className="orders__label">Loading orders…</p>
    </div>
  )

  if (error) return (
    <div className="orders orders--empty">
      <p className="orders__label">{error}</p>
    </div>
  )

  if (orders.length === 0) return (
    <div className="orders orders--empty">
      <p className="orders__label">— no orders yet —</p>
      <button className="orders__back" onClick={() => navigate('/')}>
        Back to menu
      </button>
    </div>
  )

  return (
    <div className="orders">
      <h1 className="orders__title">Order History</h1>

      <ul className="orders__list">
        {orders.map((order, i) => {
          const date = order.ordertime
            ? new Date(order.ordertime).toLocaleString('en-CA', {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit',
              })
            : 'Date unavailable'

          return (
            <li
              key={order.id}
              className="orders__item"
              style={{ animationDelay: `${i * 0.06}s` }}
              onClick={() => navigate(`/order/${order.id}`)}
            >
              <div className="orders__item-left">
                <span className="orders__item-id">#{order.id}</span>
                <span className="orders__item-date">{date}</span>
              </div>
              <div className="orders__item-right">
                {order.total != null && (
                  <span className="orders__item-total">
                    ${order.total.toFixed(2)}
                  </span>
                )}
                <span className="orders__item-arrow" aria-hidden="true">→</span>
              </div>
            </li>
          )
        })}
      </ul>

      <button className="orders__back" onClick={() => navigate('/')}>
        ← Back to menu
      </button>
    </div>
  )
}