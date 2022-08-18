import type { NextPage } from 'next'
import LotteryLayout from '@/components/LotteryLayout'
const LotteryBefore: NextPage = () => {
  return (
    <LotteryLayout>
      <div className="text-6xl text-shadow-md top-1/2 left-1/2 inline-block px-8 py-4 linear-gradient rounded-3xl bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-100 hover:translate-y-1">
        <a href="/admin/lottery" className="font-semibold text-white">
          Click to Start
        </a>
      </div>
    </LotteryLayout>
  )
}

export default LotteryBefore
