import React from 'react'
import b from './Button.module.css'
interface ButtonProps {
  onClick?: any
  children?: React.ReactNode
  className?: string
}
const LotteryButton = (props: ButtonProps) => {
  return (
    <div className={`${props.className}`}>
      <button className={`${b.lotteryButton}`} onClick={props.onClick}>
        <div>{props.children}</div>
      </button>
    </div>
  )
}
export default LotteryButton
