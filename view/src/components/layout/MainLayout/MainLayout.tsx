import React, { FC } from 'react'
import Footer from '@components/common/Footer/Footer'
import Header from '@components/common/Admin/AdminHeader/AdminHeader'
import EventRegister from '@components/common/Admin/EventRegister'

const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <EventRegister />
      <Footer />
    </div>
  )
}

export default MainLayout
