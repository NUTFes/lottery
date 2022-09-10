import React from 'react'
interface ButtonProps {
  onClick?: any
  children?: React.ReactNode
  className?: string
}
const LotteryButton = (props: ButtonProps) => {
  return (
    <div className={`${props.className}`}>
      <button className="w-full text-6xl text-shadow-md top-1/2 left-1/2 inline-block px-8 py-4 linear-gradient rounded-3xl bg-gradient-to-r from-yellow-700 via-yellow-300 to-yellow-100 hover:translate-y-1" onClick={props.onClick}>
        <div className="font-semibold text-white">{props.children}</div>
      </button>
    </div>
  );
}
export default LotteryButton
