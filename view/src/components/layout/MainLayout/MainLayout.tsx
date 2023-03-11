import React, { FC } from 'react'
import Footer from '@components/common/Footer/Footer'
import Header from '@components/common/Admin/AdminHeader/AdminHeader'
import EventParticpantCard from '@components/common/EventParticpantCard'

const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <EventParticpantCard  />
      <Footer />
    </div>
  )
}

export default MainLayout
