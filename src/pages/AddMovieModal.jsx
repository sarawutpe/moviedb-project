import React, { useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { serviceCreateMovie } from '@/services/services'
import { toast } from 'react-toastify'

export default function AddMovieModal(props) {
  const { title, open, onClose, onReload } = props
  const [formMovie, setFormMovie] = useState({
    title: '',
    language: '',
    overview: '',
    releaseDate: '',
    popularity: '0',
    isReleased: true,
  })
  const [imageFile, setImageFile] = useState(null)

  // Handle image change
  const handleImageChange = (event) => {
    const files = event.target.files

    if (files && files.length > 0) {
      setImageFile(files[0])
    }
  }

  // Handle submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const formData = new FormData()
      formData.append('title', formMovie.title)
      formData.append('language', formMovie.language)
      formData.append('overview', formMovie.overview)
      formData.append('releaseDate', formMovie.releaseDate)
      formData.append('popularity', formMovie.popularity)
      formData.append('isReleased', String(formMovie.isReleased))

      if (imageFile) {
        formData.append('posterPath', imageFile)
      }

      // Called Api
      const result = await serviceCreateMovie(formData)
      if (result.data.success) {
        toast.success('Movie has been added.')
        onClose()
        onReload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (open) {
      setImageFile(null)
    }
  }, [open])

  return (
    <>
      <Transition appear show={open}>
        <Dialog className="relative z-50" onClose={onClose}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="w-full max-w-[500px] mx-auto flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                style={{ width: '100%' }}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                      {title}
                    </Dialog.Title>
                    <div className="w-full overflow-auto">
                      <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                          {/* Choose image and Preview image */}
                          <div className="relative h-[150px] mb-2 flex justify-center rounded-lg border border-dashed border-gray-900/25">
                            <input
                              className="bg-slate-300 absolute w-full h-full px-6 py-10 opacity-0 cursor-pointer"
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                            ></input>
                            <div className="flex flex-col justify-center">
                              {imageFile ? (
                                <img src={URL.createObjectURL(imageFile)} className="h-[140px] object-contain" />
                              ) : (
                                <div>
                                  <PhotoIcon className="mx-auto h-16 w-16 text-gray-300" aria-hidden="true" />
                                  <span className="text-slate-400">Upload a file</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Title"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            onChange={(event) => setFormMovie({ ...formMovie, title: event.target.value })}
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Language"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            onChange={(event) => setFormMovie({ ...formMovie, language: event.target.value })}
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Overview"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            onChange={(event) => setFormMovie({ ...formMovie, overview: event.target.value })}
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Release Date"
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            onChange={(event) => setFormMovie({ ...formMovie, releaseDate: event.target.value })}
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="number"
                            placeholder="Popularity"
                            min={0}
                            max={10}
                            defaultValue={0}
                            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            required
                            onChange={(event) => setFormMovie({ ...formMovie, popularity: event.target.value })}
                          />
                        </div>
                        <div className="mt-4">
                          <p className="text-base">Movie is Released?</p>
                          <div className="flex items-center gap-x-3">
                            {/* Option Released  */}
                            <input
                              id="released"
                              type="radio"
                              name="is-released"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              checked
                              onChange={() => setFormMovie({ ...formMovie, isReleased: true })}
                            />
                            <label
                              htmlFor="released"
                              className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                            >
                              Released
                            </label>
                            {/* Option Upcoming  */}
                            <input
                              id="upcoming"
                              type="radio"
                              name="is-released"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              onChange={() => setFormMovie({ ...formMovie, isReleased: false })}
                            />
                            <label
                              htmlFor="upcoming"
                              className="block text-sm font-medium leading-6 text-gray-900 cursor-pointer"
                            >
                              Upcoming
                            </label>
                          </div>
                        </div>
                        <div className="flex items-center gap-x-3"></div>
                        {/* Action */}
                        <button
                          type="submit"
                          className="w-full rounded-md p-2 mt-8 bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
