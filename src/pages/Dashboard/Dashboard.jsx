import React, { useState, useEffect } from 'react'
import DashboardWrapper from '../../layouts/DashboardWrapper'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import AddMovieModal from './AddMovieModal'
import UpdateMovieModal from './UpdateMovieModal'
import { serviceGetMovies } from '../../services/services'
import debounce from 'lodash.debounce'
import Confirm from '@/components/Confirm'

export default function Dashboard() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)

  const handleSearch = debounce((searchValue) => {
    console.log('Searching for:', searchValue)
  }, 500)

  useEffect(() => {
    // serviceGetMovies()
    // toast('Wow so easy !')
  }, [])

  return (
    <>
      <DashboardWrapper>
        {/* <button onClick={() => setIsOpenUpdateModal(true)}>open modal</button> */}
        {/* Section filter */}
        <div className="flex justify-between items-center mb-4">
          {/* Search */}
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none block w-full pl-10 p-2.5"
              placeholder="Search"
              required
              onChange={(event) => {
                handleSearch(event.target.value)
              }}
            />
          </div>
        </div>

        <br />

        {/* Table */}
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Language
                </th>
                <th scope="col" className="px-6 py-3">
                  Overview
                </th>
                <th scope="col" className="px-6 py-3">
                  Poster Path
                </th>
                <th scope="col" className="px-6 py-3">
                  Release Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Popularity
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">-</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium uppercase text-red-700 ring-1 ring-inset ring-red-600/10">
                    Upcoming
                  </span>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium uppercase text-green-700 ring-1 ring-inset ring-green-600/20">
                    Released
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex">
                    <button className="flex justify-center items-center mx-2 rounded-lg hover:bg-gray-100 w-[32px] h-[32px]">
                      <PencilIcon className="w-[18px] h-[18px] text-blue-400" />
                    </button>
                    <button className="flex justify-center items-center mx-2 rounded-lg hover:bg-gray-100 w-[32px] h-[32px]">
                      <TrashIcon className="w-[18px] h-[18px] text-red-400" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Show modal */}
        <AddMovieModal title={'Add Movie'} open={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} />
        <UpdateMovieModal title={'Update Movie'} open={isOpenUpdateModal} onClose={() => setIsOpenUpdateModal(false)} />
        <Confirm title={'confirm'} open={false} onConfirm={() => {}} onClose={() => {}} />
      </DashboardWrapper>
    </>
  )
}
