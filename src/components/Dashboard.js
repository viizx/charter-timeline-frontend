import React, { useState } from 'react'
import Read from './Read'
import useFetch from '../utility/useFetch'
import Loading from './Loading'
import Create from './Create'
import Fleet from './Fleet'

const Dashboard = ({ user }) => {
  const { isPending, data: reservations } = useFetch(
    'https://charter-timeline.vercel.app/api/reservation'
  )

  const { isPending: pendingShips, data: ships } = useFetch(
    'https://charter-timeline.vercel.app/api/ship'
  )

  const [reservationModal, setReservationModal] = useState(false)
  const [shipModal, setShipModal] = useState(false)

  return (
    <>
      <div className="flex justify-center mx-auto py-5 sm:px-3 md:px-100 lg:px-100">
        {!reservationModal && (
          <button
            className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setReservationModal(!reservationModal)}
          >
            Create new Reservation
          </button>
        )}
        {reservationModal && (
          <button
            className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setReservationModal(!reservationModal)}
          >
            Hide Reservations
          </button>
        )}
        {!shipModal && (
          <button
            className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setShipModal(!shipModal)}
          >
            My Fleet
          </button>
        )}
        {shipModal && (
          <button
            className="inline-flex justify-center py-2 px-4 mx-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
            onClick={() => setShipModal(!shipModal)}
          >
            Hide Fleet
          </button>
        )}
      </div>

      <div className="flex-wrap">
        <div className=" py-2">
          {ships && reservationModal && <Create user={user} ships={ships} />}
        </div>
        <div className="py-2">
          {!pendingShips && shipModal && <Fleet user={user} ships={ships} />}
        </div>
      </div>
      {isPending && <Loading />}
      {reservations && <Read reservations={reservations} />}
    </>
  )
}

export default Dashboard
