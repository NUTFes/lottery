import React, { FC } from 'react'
import Footer from '@components/common/Footer/Footer'
import Header from '@components/common/Admin/AdminHeader/AdminHeader'
import EventParticipantCard from '@components/common/EventParticipantCard'

const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <EventParticipantCard eventId='1' />
      <Footer />
    </div>
  )
}

export default MainLayout
