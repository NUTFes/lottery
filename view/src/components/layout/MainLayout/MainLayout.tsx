import React, { FC } from 'react'
import Footer from '@components/common/Footer/Footer'
import Header from '@components/common/Admin/AdminHeader/AdminHeader'

const MainLayout: FC = () => {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default MainLayout
