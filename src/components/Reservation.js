import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../utility/useFetch'
import Edit from './Edit'
// import Loading from './Loading'

const Reservation = ({ user }) => {
  // const options = { year: 'numeric', month: 'short', day: 'numeric' }

  const { id } = useParams()
  const { data: reservation, isPending } = useFetch(
    'https://charter-timeline.vercel.app/api/reservation/' + id
  )
  const history = useHistory()

  const handleDelete = async () => {
    const response = await fetch(
      'https://charter-timeline.vercel.app/api/reservation/' + id,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': user
        }
      }
    )
    if (response) {
      history.push('/dashboard')
    }
  }

  return (
    <div>
      {reservation && user && <Edit reservation={reservation} user={user} />}
      <div className='flex justify-end p-4'>
      {!isPending && (
        <button
          onClick={handleDelete}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
        >
          Delete Reservation
        </button>
      )}
      {isPending && (
        <button
          disabled
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-800"
        >
          Working...
        </button>
      )}
      </div>
    </div>
  )
}

export default Reservation
