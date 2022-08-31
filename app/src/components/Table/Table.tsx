import React from 'react'
interface TableProps {
  children?: React.ReactNode
  className?: string
}
const Table = (props: TableProps) => {
  return (
    <div className={props.className}>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">{props.children}</table>
    </div>
  )
}
export default Table
