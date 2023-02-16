import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Create = ({ user, ships }) => {
  const history = useHistory()
  const [isPending, setIsPending] = useState(false)
  const [startDate, setStartDate] = useState([null, null])
  const [endDate, setEndDate] = useState([null, null])
  const [ship, setShip] = useState('')
  const [reservation, setReservation] = useState('')
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')
  const [error, setError] = useState(false)

  const y1 = new Date(startDate).getTime()
  const y2 = new Date(endDate).getTime()

  const y = [y1, y2]

  const handleSubmit = async (e) => {
    e.preventDefault()
    const input = {
      x: ship,
      y,
      fillColor: reservation,
      from: fromLocation,
      to: toLocation
    }

    setIsPending(true)

    const response = await fetch(
      'https://charter-timeline.vercel.app/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user
        },
        body: JSON.stringify(input)
      }
    )

    if (response.ok) {
      history.go(0)
    } else {
      setError(true)
    }
  }

  return (
    <div className="w-full px-5 ">
      <div className="align-content: center">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                htmlFor="selectVessel"
                className="block text-sm font-medium text-gray-700"
              >
                Ship
              </label>
              <select
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                aria-label="Default select example"
                id="selectVessel"
                value={ship}
                placeholder="Select vessel"
                onChange={(e) => setShip(e.target.value)}
              >

                <option defaultValue=""></option>
                {ships.map(ship => {
                  return <option key={ship._id}value={ship.name}>{ship.name}</option>
                })}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                htmlFor="reservationType"
                className="block text-sm font-medium text-gray-700"
              >
                Reservation Type
              </label>
              <select
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                aria-label="Default select example"
                value={reservation}
                id="reservationType"
                placeholder=""
                onChange={(e) => setReservation(e.target.value)}
              >
                <option defaultValue=""></option>
                <option value="#f2dbdb">Booked</option>
                <option value="#c5d8f1">Option</option>
                <option value="#dfe5ed">Free</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="fromLocation"
                className="block text-sm font-medium text-gray-700"
              >
                From Location
              </label>
              <input
                placeholder=""
                id="fromLocation"
                type="text"
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                placeholder=""
                type="date"
                id="startDate"
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></input>
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="toLocation"
                className="block text-sm font-medium text-gray-700"
              >
                To Location
              </label>
              <input
                placeholder=""
                id="toLocation"
                type="text"
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="toDate"
                className="block text-sm font-medium text-gray-700"
              >
                To Date
              </label>
              <input
                placeholder=""
                type="date"
                id="toDate"
                className="mt-1 block w-full py-2  border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 py-2 py-3 text-right ">
              {!isPending && (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Add Reservation
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  type="submit"
                  className="inline-flex justify-center py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Working...
                </button>
              )}
              {error && <p>Something went wron</p>}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Create
