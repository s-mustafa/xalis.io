import React, { useEffect, useReducer } from 'react'
import './tailwind.generated.css'
import Form from './Form'

const STORAGE_KEY = 'TRANSACTIONS'

const App = () => {
  const [transactions, dispatch] = useReducer(
    transactionsReducer,
    JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || []
  )

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  return (
    <div>
      <nav className="bg-white shadow" role="navigation">
        <div className="container mx-auto p-4 flex flex-wrap items-center md:flex-no-wrap">
          <div className="mr-4 md:mr-8">
            <a href="/" rel="home" className="text-green-500 text-xl font-semibold">
              xalis.io
            </a>
          </div>
        </div>
      </nav>
      <div className="rounded shadow border-l-4 border border-green-500 bg-green-100 mx-auto w-2/3 px-2 py-1 mt-4">
        <p className="text-3xl" data-testid="balance">
          {formatAmount(
            transactions.reduce(
              (sum, transaction) => sum + parseInt(transaction.amount),
              0
            )
          )}
        </p>
        <p className="text-gray-600 text-sm">Solde</p>
      </div>
      <Form onAdd={transaction => dispatch({ type: 'add', transaction })} />
      <div className="bg-white shadow-md mx-auto rounded-lg w-2/3 py-4">
        <div className="block px-8 text-gray-700 text-lg font-semibold mb-1">
          Transactions
        </div>
        <div>
          {transactions.map((transaction, i) => (
            <div
              key={i}
              className="py-2 px-8 flex justify-between bg-white even:bg-gray-300">
              <div className="sm:flex">
                <div className="sm:w-32">
                  <p>{transaction.desc}</p>
                  <p>{transaction.date}</p>
                </div>
                <p className="sm:w-32 sm:text-right self-center">
                  {formatAmount(transaction.amount)}
                </p>
              </div>
              <span
                className="flex"
                data-testid="remove-icon"
                onClick={() => dispatch({ type: 'remove', transaction })}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current text-red-400 self-center"
                  width="24"
                  height="24">
                  <path
                    className="heroicon-ui"
                    d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
        {transactions.length === 0 && (
          <p className="text-center">Il n&apos;y a pas encore de transaction.</p>
        )}
      </div>
    </div>
  )
}

const transactionsReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.transaction]
    case 'remove':
      return state.filter(transaction => transaction !== action.transaction)
    default:
      return state
  }
}

const formatAmount = amount => `${Number(amount).toLocaleString('fr-FR')} FCFA`

export default App
