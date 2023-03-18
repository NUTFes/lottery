import React, { FC } from 'react'
import Footer from '@components/common/Footer/Footer'
import Header from '@components/common/Admin/AdminHeader/AdminHeader'
import s from './MainLayout.module.css'

interface Props {
  children: React.ReactNode
}

const MainLayout = (props:Props) => {

  return (
    <div>
      <Header />
        <div>{props.children}</div>
      <Footer />
    </div>
  )
}

export default MainLayout
