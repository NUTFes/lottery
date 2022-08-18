import React from 'react'
interface CardBodyProps {
  children?: React.ReactNode
}
const CardBody = (props: CardBodyProps) => {
  return <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.children}</p>
}
export default CardBody
