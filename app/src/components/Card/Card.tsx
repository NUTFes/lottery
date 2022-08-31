import React from 'react'
interface CardProps {
  children?: React.ReactNode
  className?: string
}
const Card = (props: CardProps) => {
  return (
    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {props.children}
    </div>
  )
}
export default Card
