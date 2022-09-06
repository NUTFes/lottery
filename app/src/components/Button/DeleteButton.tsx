import React from 'react'
interface DeleteButtonProps {
  onClick?: any
  children?: React.ReactNode
}
const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={props.onClick}>
      <div className='flex items-center'>{props.children}</div>
    </button>
  );
}
export default DeleteButton
