import type { NextPage } from 'next'
import Odometer from '@/components/Odometer'


const OdometerTest : NextPage = () => {
  return (
    <Odometer value={ '00000000' }></Odometer>
  )
}

export default OdometerTest
