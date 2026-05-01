import { useNavigate } from 'react-router-dom'
import type { Order } from '../types/order'
import '../style/OrdersPage.css'

type OrdersPageProps = {
  placedOrders: Order[]
}

export function OrdersPage({ placedOrders }: OrdersPageProps) {
  const navigate = useNavigate()

  if (placedOrders.length === 0) {
    return (
      <div className="orders orders--empty">
        <p className="orders__label">— no orders yet —</p>
        <button className="orders__back" onClick={() => navigate('/')}>
          Back to menu
        </button>
      </div>
    )
  }

  return (
    <div className="orders">
      <h1 className="orders__title">Order History</h1>
      <ul className="orders__list">
        {placedOrders.map((order, i) => {
          const date = new Date(order.createdAt).toLocaleString('en-CA', {
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit',
          })
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
                <span className="orders__item-total">${order.total.toFixed(2)}</span>
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