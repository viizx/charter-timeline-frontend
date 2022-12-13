import React from 'react'
import { Link } from 'react-router-dom'

const Read = ({ reservations }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }

  return (
    <div className="text-center min-h-full items-center justify-center py-12  sm:px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 sm:col-span-1 py-2">Ship</div>
        <div className="col-span-1 sm:col-span-1 py-2">From</div>
        <div className="col-span-1 sm:col-span-1 py-2">To</div>
      </div>

      {reservations.map((reservation) => (
        <div key={reservation._id}>
          <Link to={`reservations/${reservation._id}`}>
            <div className="grid grid-cols-3 gap-6 hover:bg-gray-200">
              <div className="col-span-1 sm:col-span-1 py-2">
                {reservation.x}
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
