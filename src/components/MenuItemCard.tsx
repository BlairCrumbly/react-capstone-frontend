import type { MenuItem } from '../types/Menu'
import '../style/MenuItemCard.css'
type MenuItemCardProps = {
  menuItem: MenuItem
  index?: number
  onAddToCart?: (item: MenuItem) => void
}

export function MenuItemCard({ menuItem, index = 0, onAddToCart }: MenuItemCardProps) {
  const handleAdd = () => {
    if (onAddToCart) onAddToCart(menuItem)
  }

  return (
    <article className="menu-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="card-index">
        
        {menuItem.category && <> · {menuItem.category}</>}
      </div>

      <header className="card-header">
        <h2 className="card-name">{menuItem.name}</h2>
        <span className="card-price">${menuItem.price.toFixed(2)}</span>
      </header>

      {menuItem.description && (
        <p className="card-description">{menuItem.description}</p>
      )}

      <footer className="card-footer">
        <button type="button" className="card-btn" onClick={handleAdd}>
          <span className="card-btn-text">Add to cart</span>
          <span className="card-btn-icon" aria-hidden="true">+</span>
        </button>
      </footer>
    </article>
  )
}