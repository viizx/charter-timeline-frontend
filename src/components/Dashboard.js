import React from 'react'
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

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center p-5 w-full">
        <div className='flex flex-col p-1 w-auto'>
          <h2 className="text-xl">Create New Reservation</h2>
          {ships && <Create user={user} ships={ships} />}
        </div>
        <div className='flex flex-col p-1 w-auto'>
          <h2 className="text-xl">My Fleet</h2>
          {!pendingShips && <Fleet user={user} ships={ships} />}
        </div>
      </div>
      {isPending && <Loading />}

      <div className="p-5">
        <h2 className="text-xl">Reservations</h2>
        {reservations && <Read reservations={reservations} />}
      </div>
    </>
  )
}

export default Dashboard
