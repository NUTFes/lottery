import React from 'react'
import al from './AdminLayout.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import Toolbar from '@/components/Toolbar'
interface AdminLayoutProps {
  className?: string
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
}
const AdminLayout = (props: AdminLayoutProps) => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="sticky top-0 z-50 bg-white">
        <Header className="flex justify-between items-center py-4 md:py-8" />
      </div>
      <div className="flex">
        <Sidebar className="flex-none w-64 h-screen sticky top-0 hidden sm:hidden md:block lg:block xl:block" />
        <div className="grow">{props.children}</div>
        <Toolbar className="flex-none w-1/3 h-screen sticky top-0 hidden sm:hidden md:hidden lg:block xl:block" />
      </div>
      <Footer className="bg-white pt-4 sm:pt-10 lg:pt-12"></Footer>
    </div>
  )
}
export default AdminLayout
