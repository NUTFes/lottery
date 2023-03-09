import React, { FC } from 'react'
import Header from '@components/common/Header/AdminHeader'
import Footer from '@components/common/Footer/Footer'
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
