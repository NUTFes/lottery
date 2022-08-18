import React from 'react'
interface UserIconProps {
  className?: string
}
const UserIcon = (props: UserIconProps) => {
  return (
    <div className={props.className}>
      <svg xmlns="http://www.w3.org/2000/svg" className=" w-16 sm:w-16 h-16 sm:h-16 fill-gray-500" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
export default UserIcon
