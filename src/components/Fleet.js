import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Fleet ({ user, ships }) {
  const history = useHistory()
  const [name, setName] = useState('')

  const handleDelete = async (id) => {
    const response = await fetch(
      'https://charter-timeline.vercel.app/api/ship/' + id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user
        }
      }
    )
    if (response) {
      history.go(0)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await fetch(
      'https://charter-timeline.vercel.app/api/ship/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user
        },
        body: JSON.stringify({ name })
      }
    )
    if (response) {
      history.go(0)
    }
  }

  return (
    ships && (
      <div className="px-5">
        <div className="container mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
          <div>
            {ships.map((ship) => {
              return (
                <div className="grid grid-cols-6 my-3" key={ship._id}>
                  <div className="col-span-5">{ship.name}</div>
                  <div className="col-span-1"><button
                    onClick={() => handleDelete(ship._id)}
                    className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                  >
                    Delete
                  </button></div>
                </div>
              )
            })}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6">
                <div className="col-span-5">
                  <input
                    placeholder="Add new Yacht"
                    className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                {/* <div className="col-span-2 sm:col-span-2">
                </div> */}
                <div className="col-span-1 ">
                  <button
                    type="submit"
                    value="Submit"
                    className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default Fleet
