import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Confirm(props) {
  const { open, onClose, onConfirm } = props
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
                      Confirm
                    </Dialog.Title>
                    <div className="flex gap-10">
                      <button
                        type="submit"
                        className="w-full rounded-md p-2 px-3 py-2 text-sm border border-solid border-slate-100 font-semibold text-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                        onClick={onConfirm}
                      >
                        Yes
                      </button>
                      <button
                        type="submit"
                        className="w-full rounded-md p-2 px-3 py-2 text-sm border border-solid border-slate-100 font-semibold text-indigo-500 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
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
