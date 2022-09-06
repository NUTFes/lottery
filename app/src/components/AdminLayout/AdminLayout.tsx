import React from 'react'
import al from './AdminLayout.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'

interface Time {
  start: Date
  end: Date
}

interface AdminLayoutProps {
  className?: string
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
  time: Time
}
 
const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <div className="mx-auto max-w-screen-2xl dark:bg-gray-800">
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800">
        <Header className="flex items-center justify-between py-4 md:py-8" />
      </div>
      <div className="flex">
        <Sidebar className="sticky top-0 hidden h-screen w-64 flex-none sm:hidden md:block lg:block xl:block" />
        <div className="grow">{props.children}</div>
        <Toolbar time={props.time} className="sticky top-0 hidden h-screen w-96 flex-none sm:hidden md:hidden lg:block xl:block" />
      </div>
    </div>
  )
}
export default AdminLayout
