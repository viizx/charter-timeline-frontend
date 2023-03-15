import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Edit = (props) => {
  const { id } = useParams()
  const [isPending, setIsPending] = useState(false)

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    ship: '',
    reservation: '',
    fromLocation: '',
    toLocation: '',
    broker: ''
  })

  const setDefaultValues = () => {
    setFormData({
      startDate: new Date(props.reservation.y[0]).toISOString().split('T')[0],
      endDate: new Date(props.reservation.y[1]).toISOString().split('T')[0],
      ship: props.reservation.x,
      reservation: props.reservation.fillColor,
      fromLocation: props.reservation.from,
      toLocation: props.reservation.to,
      broker: props.reservation.broker
    })
  }

  useEffect(() => {
    if (props) {
      setDefaultValues()
    }
  }, [props])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { startDate, endDate, ship, reservation, fromLocation, toLocation, broker } = formData
    const y1 = new Date(startDate).getTime()
    const y2 = new Date(endDate).getTime()
    const input = {
      x: ship,
      y: [y1, y2],
      fillColor: reservation,
      from: fromLocation,
      to: toLocation,
      broker
    }

    setIsPending(true)

    fetch(
      'https://charter-timeline.vercel.app/api/reservation/' +
        id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': props.user
        },
        body: JSON.stringify(input)
      }
    )
      .then(() => setIsPending(false))
      .catch((error) => console.log(error))
  }

  return (
    <div className="container mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
      <form onSubmit={handleSubmit}>
        <div className="align-content: center px-4">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-6 py-2">
              <label
                htmlFor="selectVessel"
                className="block text-sm font-medium text-gray-700"
              >
                Yacht
              </label>
              <select
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-label="Default select example"
                id="selectVessel"
                value={formData.ship}
                placeholder="Select vessel"
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, ship: e.target.value }))}
              >
                <option defaultValue="">Select vessel</option>
                <option value="Lady Gita">Lady Gita</option>
                <option value="Ardura">Ardura</option>
                <option value="Alba">Alba</option>
                <option value="Slano">Slano</option>
                <option value="Vito">Vito</option>
                <option value="Korab">Korab</option>
                <option value="Agape Rose">Agape Rose</option>
                <option value="Son De Mar">Son De Mar</option>
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                aria-label="Default select example"
                value={formData.reservation}
                id="reservationType"
                placeholder=""
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, reservation: e.target.value }))}
              >
                <option defaultValue="">Select your option</option>
                <option value="#f2dbdb">Booked</option>
                <option value="#c5d8f1">Option</option>
                <option value="#e0e8df">Available</option>
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.fromLocation}
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, fromLocation: e.target.value }))}
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
                type="date"
                id="startDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.startDate}
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, startDate: e.target.value }))}
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
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.toLocation}
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, toLocation: e.target.value }))}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="toLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Broker
              </label>
              <input
                placeholder=""
                id="broker"
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.broker}
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, broker: e.target.value }))}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 py-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.endDate}
                onChange={(e) => setFormData(prevForm => ({ ...prevForm, endDate: e.target.value }))}
              />
            </div>
            <div className="col-span-6 sm:col-span-6 py-2 px-4 text-right sm:px-6">
              {!isPending && (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Edit Reservation
                </button>
              )}
              {isPending && (
                <button
                  disabled
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
                >
                  Working...
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Edit
