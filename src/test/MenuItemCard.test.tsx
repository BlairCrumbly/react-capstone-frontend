import { render, screen, fireEvent } from '@testing-library/react'
import { MenuItemCard } from '../components/MenuItemCard'

const mockItem = {
  id: 1,
  name: 'Bison Burger',
  description: 'A delicious burger',
  price: 11.54,
  category: 'entrees',
  imageurl: '/images/food/burger_1.jpg',
}

test('renders the item name', () => {
  render(<MenuItemCard menuItem={mockItem} />)
  expect(screen.getByText('Bison Burger')).toBeInTheDocument()
})

test('renders the item price', () => {
  render(<MenuItemCard menuItem={mockItem} />)
  expect(screen.getByText('$11.54')).toBeInTheDocument()
})

test('renders the description', () => {
  render(<MenuItemCard menuItem={mockItem} />)
  expect(screen.getByText('A delicious burger')).toBeInTheDocument()
})

test('calls onAddToCart when button is clicked', () => {
  const mockAddToCart = vi.fn()
  render(<MenuItemCard menuItem={mockItem} onAddToCart={mockAddToCart} />)
  fireEvent.click(screen.getByText('Add to cart'))
  expect(mockAddToCart).toHaveBeenCalledWith(mockItem)
})

test('renders the image', () => {
  render(<MenuItemCard menuItem={mockItem} />)
  const img = screen.getByAltText('Bison Burger')
  expect(img).toBeInTheDocument()
  expect(img).toHaveAttribute('src', '/images/food/burger_1.jpg')
})