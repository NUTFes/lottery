import React from 'react'
interface ButtonProps {
  href?: string
  children?: React.ReactNode
}
const Button = (props: ButtonProps) => {
  return (
    <a
      href={props.href}
      className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {props.children}
    </a>
  )
}
export default Button
