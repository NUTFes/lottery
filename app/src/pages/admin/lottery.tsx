import type { NextPage } from 'next'
import LotteryLayout from '@/components/LotteryLayout'
import Odometer from '@/components/Odometer'
const Lottery: NextPage = () => {
  return (
    <LotteryLayout>
      <Odometer value={'00000000'}></Odometer>
    </LotteryLayout>
  )
}

export default Lottery
