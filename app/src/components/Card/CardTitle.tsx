import React from 'react'
interface CardTitleProps {
  children?: React.ReactNode
}
const CardTitle = (props: CardTitleProps) => {
  return <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.children}</h5>
}
export default CardTitle
