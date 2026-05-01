import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

const emptyCart = { items: [] }

const cartWithItems = {
  items: [
    {
      menuItem: { id: 1, name: 'Bison Burger', price: 11.54, description: '' },
      quantity: 2,
      notes: '',
    },
  ],
}

test('renders brand name', () => {
  render(<MemoryRouter><NavBar cart={emptyCart} /></MemoryRouter>)
  expect(screen.getByText('Dinner App')).toBeInTheDocument()
})

test('shows 0 items when cart is empty', () => {
  render(<MemoryRouter><NavBar cart={emptyCart} /></MemoryRouter>)
  expect(screen.getByText(/Checkout \(0\)/)).toBeInTheDocument()
})

test('shows correct item count in nav', () => {
  render(<MemoryRouter><NavBar cart={cartWithItems} /></MemoryRouter>)
  expect(screen.getByText(/Checkout \(2\)/)).toBeInTheDocument()
})

test('renders all nav links', () => {
  render(<MemoryRouter><NavBar cart={emptyCart} /></MemoryRouter>)
  expect(screen.getByText(/Home/)).toBeInTheDocument()
  expect(screen.getByText(/Orders/)).toBeInTheDocument()
  expect(screen.getByText(/Login/)).toBeInTheDocument()
})