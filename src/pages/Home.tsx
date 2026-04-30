import type { MenuItem } from '../types/Menu'
import { MenuItemList } from '../components/MenuItemList'

type HomeProps = {
  addToCart: (item: MenuItem) => void
}

export function Home({ addToCart }: HomeProps) {
  return <MenuItemList onAddToCart={addToCart} />
}