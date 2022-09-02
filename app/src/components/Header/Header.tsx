import React from 'react'
import h from './Header.module.css'
interface HeaderProps {
  className?: string
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
}
const Header = (props: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-2 py-8 md:py-8">
      <button
        type="button"
        className="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
      <a
        href="/admin"
        className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5 dark:bg-gray-800 dark:text-white"
        aria-label="logo"
      >
        学籍番号抽選会 管理者画面
      </a>
    </header>
  )
}
export default Header
