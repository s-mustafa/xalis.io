import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { container } = render(<App />)
  fireEvent.change(screen.getByTestId('description'), {
    target: { value: 'Chaussure' }
  })
  fireEvent.change(screen.getByTestId('amount'), {
    target: { value: '1000' }
  })
  fireEvent.change(screen.getByTestId('date'), {
    target: { value: '2020-02-03' }
  })

  fireEvent.click(screen.getByTestId('submit-button'))

  expect(window.localStorage.getItem('TRANSACTIONS')).toEqual(
    JSON.stringify([
      { desc: 'Chaussure', amount: '1000', date: '2020-02-03', type: 'credit' }
    ])
  )

  expect(screen.getByTestId('balance')).toHaveTextContent('1,000 FCFA')

  fireEvent.change(screen.getByTestId('description'), {
    target: { value: 't-shirt' }
  })
  fireEvent.change(screen.getByTestId('amount'), {
    target: { value: '500' }
  })
  fireEvent.change(screen.getByTestId('date'), {
    target: { value: '2020-02-08' }
  })

  fireEvent.click(screen.getByTestId('submit-button'))

  expect(screen.getByTestId('balance')).toHaveTextContent('1,500 FCFA')

  fireEvent.click(container.querySelector('[data-testid="remove-icon"]').firstChild)

  expect(screen.getByTestId('balance')).toHaveTextContent('500 FCFA')

  fireEvent.change(screen.getByTestId('description'), {
    target: { value: 'taxe' }
  })
  fireEvent.change(screen.getByTestId('amount'), {
    target: { value: '100' }
  })
  fireEvent.change(screen.getByTestId('date'), {
    target: { value: '2020-02-08' }
  })
  fireEvent.click(screen.getByLabelText(/Débit/i))

  fireEvent.click(screen.getByTestId('submit-button'))

  expect(screen.getByTestId('balance')).toHaveTextContent('400 FCFA')
})
