import React from 'react'
interface CardProps {
  children?: React.ReactNode
  className?: string
}
const Card = (props: CardProps) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
      {props.children}
    </div>
  )
}
export default Card
