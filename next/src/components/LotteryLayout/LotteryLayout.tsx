import React from 'react'
import ll from './LotteryLayout.module.css'

interface LotteryLayout {
  children?: React.ReactNode
}

const LotteryLayout = (props: LotteryLayout) => {
  return (
    <div className={`${ll.OdometerContainer}`}>
      <div className={`${ll.odometer}`}>{props.children}</div>
    </div>
  )
}
export default LotteryLayout
