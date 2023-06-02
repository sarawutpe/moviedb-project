import React, { useState } from 'react'
import reactLogo from '/react.svg'
import viteLogo from '/vite.svg'
import { HomeIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

export default function DashboardWrapper(props) {
  const navigate = useNavigate()
  const { children, movieCount = 0 } = props
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  const handleSidebar = () => {
    setIsOpenMenu(!isOpenMenu)
  }

  return (
    <>
      {/* Open sidebar button */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={handleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        style={{ transform: isOpenMenu ? 'none' : '' }}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          {/* Head */}
          <div className="flex justify-evenly">
            <img src={viteLogo} className="vite-logo" alt="Vite logo" />
            <img src={reactLogo} className="react-logo" alt="React logo" />
          </div>
          <hr className="my-4" />
          {/* Menu */}
          <ul className="space-y-2 font-medium">
            <li onClick={() => navigate('/dashboard')}>
              <div className="cursor-pointer flex items-center p-2 text-gray-900 rounded-lghover:bg-gray-100">
                <HomeIcon className="w-[24px] h-[24px] text-[#6b7280]" />
                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
                  {movieCount}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Backdrop */}
      <div
        className={`bg-gray-900 bg-opacity-50 fixed inset-0 z-30 ${isOpenMenu ? 'block' : 'hidden'} sm:hidden`}
        onClick={handleSidebar}
      ></div>

      <div className="p-4 sm:ml-64">
        <div style={{ minHeight: 'calc(100vh - 32px)' }} className="p-4 border-2 border-gray-200 border-1 rounded-lg">
          {children}
        </div>
      </div>
    </>
  )
}
