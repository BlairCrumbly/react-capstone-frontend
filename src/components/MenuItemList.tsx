import { useEffect, useState } from 'react'
import type { MenuItem } from '../types/Menu'
import { MenuItemCard } from './MenuItemCard'
import '../style/MenuItemList.css'

type MenuItemListProps = {
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemList({ onAddToCart }: MenuItemListProps) {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true)
        setError(null)

        const resp = await fetch('/api/menuitems')
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

        const data: MenuItem[] = await resp.json()
        setItems(data)
      } catch (err) {
        console.error("we're having trouble fetching the menu items", err)
        setError('Failed to load menu items')
      } finally {
        setLoading(false)
      }
    }

    loadMenu()
  }, [])

  if (loading) return <div>Loading menu…</div>
  if (error) return <div>Error: {error}</div>
  if (items.length === 0) return <div>No menu items available.</div>

  return (
    <div className="menu-list">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          menuItem={item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}