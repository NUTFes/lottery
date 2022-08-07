import React from 'react';
import ll from './LotteryLayout.module.css';

interface LotteryLayout {
  className?: string
  align?: string
  justify?: string
  width?: string
  height?: string
  gap?: string
  children?: React.ReactNode
}

const LotteryLayout = (props: LotteryLayout) => {
  return (
    <div className={`${ll.OdometerContainer}`}>
      <div className={`${ll.odometer}`}>
        77777777
      </div>
    </div>
  )
}
export default LotteryLayout