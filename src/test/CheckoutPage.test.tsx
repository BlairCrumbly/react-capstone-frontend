import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CheckoutPage } from '../pages/CheckoutPage'

const mockCart = {
  items: [
    {
      menuItem: { id: 1, name: 'Bison Burger', price: 11.54, description: '' },
      quantity: 2,
      notes: '',
    },
  ],
}

const emptyCart = { items: [] }

test('shows empty message when cart is empty', () => {
  render(
    <MemoryRouter>
      <CheckoutPage
        cart={emptyCart}
        updateNotes={vi.fn()}
        clearCart={vi.fn()}
        onOrderPlaced={vi.fn()}
      />
    </MemoryRouter>
  )
  expect(screen.getByText(/your cart is empty/)).toBeInTheDocument()
})

test('renders item name in checkout', () => {
  render(
    <MemoryRouter>
      <CheckoutPage
        cart={mockCart}
        updateNotes={vi.fn()}
        clearCart={vi.fn()}
        onOrderPlaced={vi.fn()}
      />
    </MemoryRouter>
  )
  expect(screen.getByText('Bison Burger')).toBeInTheDocument()
})

test('renders subtotal correctly', () => {
  render(
    <MemoryRouter>
      <CheckoutPage
        cart={mockCart}
        updateNotes={vi.fn()}
        clearCart={vi.fn()}
        onOrderPlaced={vi.fn()}
      />
    </MemoryRouter>
  )
  const allInstances = screen.getAllByText('$23.08')
  expect(allInstances).toHaveLength(2) // item price + subtotal row
})

test('renders clear cart button', () => {
  render(
    <MemoryRouter>
      <CheckoutPage
        cart={mockCart}
        updateNotes={vi.fn()}
        clearCart={vi.fn()}
        onOrderPlaced={vi.fn()}
      />
    </MemoryRouter>
  )
  expect(screen.getByText('Clear cart')).toBeInTheDocument()
})