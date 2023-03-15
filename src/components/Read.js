import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const PAGE_SIZE = 10

const Read = ({ reservations }) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const [searchTerm, setSearchTerm] = useState('')
  const [searchFromDate, setSearchFromDate] = useState('')
  const [searchToDate, setSearchToDate] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleFromDateChange = (event) => {
    setSearchFromDate(event.target.value)
    setCurrentPage(1)
  }

  const handleToDateChange = (event) => {
    setSearchToDate(event.target.value)
    setCurrentPage(1)
  }

  const filteredReservations = reservations.filter((reservation) => {
    if (!searchFromDate || !searchToDate) { return reservation.x.toLowerCase().includes(searchTerm.toLowerCase()) }
    return (
      reservation.x.toLowerCase().includes(searchTerm.toLowerCase()) &&
      reservation.y[0] >= new Date(searchFromDate).getTime() &&
      reservation.y[1] <= new Date(searchToDate).getTime()
    )
  })

  const maxPage = Math.ceil(filteredReservations.length / PAGE_SIZE)
  const pageReservations = filteredReservations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const renderPagination = () => {
    const pages = []
    for (let i = 1; i <= maxPage; i++) {
      pages.push(
        <li
          key={i}
          className={`px-3 py-1 ${
            i === currentPage ? 'bg-blue-500 text-white' : ''
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </li>
      )
    }
    return (
      <div className="mt-4">
        <ul className="flex justify-center space-x-2">{pages}</ul>
      </div>
    )
  }

  return (
    <div className="text-center min-h-full items-center justify-center py-12  sm:px-4 md:px-6 lg:px-8">
      <div className="flex justify-center mt-4 space-x-4">
        <div>
          <label htmlFor="search" className="sr-only">
            Search by Yacht name:
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search by Yacht name"
              value={searchTerm}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="from-date" className="sr-only">
            Date From Filter:
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="date"
              name="from-date"
              id="from-date"
              className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={searchFromDate}
              onChange={handleFromDateChange}
            />

            <div className="absolute inset-y-0 right-0 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="to-date" className="sr-only">
            Date To Filter:
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="date"
              name="to-date"
              id="to-date"
              className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              value={searchToDate}
              onChange={handleToDateChange}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {pageReservations.length > 0
        ? (
        <>
          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Yacht Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Start Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  End Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pageReservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.x}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(reservation.y[0]).toLocaleDateString(
                        'en-US',
                        options
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(reservation.y[1]).toLocaleDateString(
                        'en-US',
                        options
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/update/${reservation.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
          )
        : (
        <div className="mt-4 text-gray-500">No reservations found.</div>
          )}
    </div>
  )
}
export default Read
