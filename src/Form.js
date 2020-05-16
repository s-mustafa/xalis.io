import React, { useState } from 'react'

const INITIAL_STATE = {
  desc: '',
  amount: '',
  date: '',
  type: 'credit'
}

const Form = ({ onAdd }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE })
  const onChange = name => e => {
    setFormData({ ...formData, [name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()

    onAdd(formData)
    setFormData({ ...INITIAL_STATE })
  }
  const { desc, amount, date, type } = formData
  return (
    <form className="py-1 my-4 mx-auto w-2/3" onSubmit={onSubmit}>
      <p className="border-b mb-3 py-2 font-bold">Ajouter une transaction</p>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          name="desc"
          value={desc}
          onChange={onChange('desc')}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          placeholder="Description"
          data-testid="description"
          autoComplete="off"
        />
        <input
          name="amount"
          value={amount}
          onChange={onChange('amount')}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="number"
          data-testid="amount"
          placeholder="Montant"
        />
        <input
          name="date"
          value={date}
          onChange={onChange('date')}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="date"
          data-testid="date"
          placeholder="Date"
        />
        <div className="flex">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              value="credit"
              checked={type === 'credit'}
              onChange={onChange('type')}
            />
            <span className="ml-2">Crédit</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              value="debit"
              checked={type === 'debit'}
              onChange={onChange('type')}
            />
            <span className="ml-2">Débit</span>
          </label>
        </div>
      </div>
      <button
        type="submit"
        data-testid="submit-button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded-lg">
        Ajouter
      </button>
    </form>
  )
}

export default Form
