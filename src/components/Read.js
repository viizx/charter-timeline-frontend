import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Read = ({ reservations }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFromDate, setSearchFromDate] = useState('')
  const [searchToDate, setSearchToDate] = useState('')

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFromDateChange = (event) => {
    setSearchFromDate(event.target.value)
  }

  const handleToDateChange = (event) => {
    setSearchToDate(event.target.value)
  }

  const filterReservations = (reservation) => {
    if (!searchFromDate || !searchToDate) { return reservation.x.toLowerCase().includes(searchTerm.toLowerCase()) }
    return (
      reservation.x.toLowerCase().includes(searchTerm.toLowerCase()) &&
      reservation.y[0] >= new Date(searchFromDate).getTime() &&
      reservation.y[1] <= new Date(searchToDate).getTime()
    )
  }
  const filteredReservations = reservations.filter(filterReservations)
  return (
    <div className="text-center min-h-full items-center justify-center py-12  sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col align-center flex-wrap py-2">
        Search by Yacht name:{' '}
        <input
          className="mt-1 block py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search by Yacht name"
        />
        Date From Filter:
        <input
          className="mt-1 block py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
          type="date"
          id="from-date"
          value={searchFromDate}
          onChange={handleFromDateChange}
          placeholder="From"
        />
        Date To Filter:
        <input
          className="mt-1 block py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-slate-800 focus:border-slate-800 sm:text-sm"
          type="date"
          id="to-date"
          value={searchToDate}
          onChange={handleToDateChange}
          placeholder="To"
        />
      </div>
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 sm:col-span-1 py-2">Yacht</div>
        <div className="col-span-1 sm:col-span-1 py-2">Broker</div>
        <div className="col-span-1 sm:col-span-1 py-2">From</div>
        <div className="col-span-1 sm:col-span-1 py-2">To</div>
      </div>

      {filteredReservations.map((reservation) => (
        <div key={reservation._id}>
          <Link to={`reservations/${reservation._id}`}>
            <div className="grid grid-cols-4 gap-6 hover:bg-gray-200">
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.x}
              </div>
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.broker}
              </div>
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.from},{' '}
                {new Date(reservation.y[0]).toLocaleDateString(
                  'en-UK',
                  options
                )}
              </div>
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.to},{' '}
                {new Date(reservation.y[1]).toLocaleDateString(
                  'en-UK',
                  options
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Read
