import DashboardWrapper from '@/layouts/DashboardWrapper'
import React, { useCallback, useEffect, useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { serviceDeleteMovie, serviceGetMovie } from '@/services/services'
import CircleLoading from '@/components/CircleLoading'
import debounce from 'lodash.debounce'
import AddMovieModal from './AddMovieModal'
import UpdateMovieModal from './UpdateMovieModal'
import Confirm from '@/components/Confirm'
import { toast } from 'react-toastify'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false)
  const [id, setId] = useState('')

  // Debounce 500ms before search
  const handleSearch = debounce((searchValue) => {
    fetchMovies(searchValue)
  }, 500)

  const fetchMovies = useCallback((searchValue) => {
    // Start loading
    setIsLoading(true)
    serviceGetMovie(searchValue)
      .then((result) => {
        setMovies(result.data.data)
      })
      .catch((eror) => {
        console.log(eror)
      })
      .finally(() => {
        // delay 1s
        setTimeout(() => {
          // End loading
          setIsLoading(false)
        }, 1000)
      })
  }, [])

  const handleDelete = async () => {
    try {
      const result = await serviceDeleteMovie(id)
      if (result.data.success) {
        toast.warn('Movie has been removed.')
        fetchMovies()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <>
      <DashboardWrapper movieCount={movies.length}>
        {/* Section filter */}
        <div className="flex justify-between items-center mb-4 gap-2">
          {/* Search */}
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>

          <div className="flex gap-4 w-full">
            <div className="relative flex flex-1 w-full">
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
            <div className="flex">
              <button
                type="button"
                className="rounded-md p-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setIsOpenAddModal(true)}
              >
                Add Movie +
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end"></div>

        <br />

        {isLoading ? (
          <div className="flex justify-center">
            <CircleLoading />
          </div>
        ) : (
          <>
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
                  {movies.map((movie) => (
                    <tr key={movie._id} className="bg-white border-b">
                      <td className="px-6 py-4">{movie.title}</td>
                      <td className="px-6 py-4">{movie.language}</td>
                      <td className="px-6 py-4">{movie.overview}</td>
                      <td className="px-6 py-4">
                        <img
                          className="h-[150px] object-contain"
                          src={`${import.meta.env.VITE_URL_IMAGE}/uploads/${movie.posterPath}`}
                        />
                      </td>
                      <td className="px-6 py-4">{movie.releaseDate}</td>
                      <td className="px-6 py-4">{movie.popularity}</td>
                      <td className="px-6 py-4">
                        {movie.isReleased ? (
                          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium uppercase text-green-700 ring-1 ring-inset ring-green-600/20">
                            Released
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium uppercase text-red-700 ring-1 ring-inset ring-red-600/10">
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <button
                            className="flex justify-center items-center mx-2 rounded-lg hover:bg-gray-100 w-[32px] h-[32px]"
                            onClick={() => {
                              setId(movie._id)
                              setIsOpenUpdateModal(true)
                            }}
                          >
                            <PencilIcon className="w-[18px] h-[18px] text-blue-400" />
                          </button>
                          <button
                            className="flex justify-center items-center mx-2 rounded-lg hover:bg-gray-100 w-[32px] h-[32px]"
                            onClick={() => {
                              setId(movie._id)
                              setIsOpenConfirmModal(true)
                            }}
                          >
                            <TrashIcon className="w-[18px] h-[18px] text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </DashboardWrapper>
      {/* Show modal form add */}
      <AddMovieModal
        title={`Update Movie`}
        open={isOpenAddModal}
        onClose={() => setIsOpenAddModal(false)}
        onReload={() => fetchMovies('')}
      />
      {/* Show modal form update */}
      <UpdateMovieModal
        title={`Update Movie`}
        id={id}
        open={isOpenUpdateModal}
        onClose={() => setIsOpenUpdateModal(false)}
        onReload={() => fetchMovies('')}
      />
      {/* Show modal confirm delete */}
      <Confirm
        title="Confirm"
        open={isOpenConfirmModal}
        onClose={() => {
          setIsOpenConfirmModal(false)
          setId('')
        }}
        onConfirm={() => {
          setIsOpenConfirmModal(false)
          handleDelete()
        }}
      />
    </>
  )
}
