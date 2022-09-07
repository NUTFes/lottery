import MobileLayout from '@/components/MobileLayout'
import type { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { get } from '@/utils/api_methods'

interface Register {
  register: number
}

interface Props {
  register: Register
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI+'/register'
  const json = await get(getUrl)
  return {
    props:{
      register: json
    } 
  }
}

const Counter: NextPage<Props> = (props) => {
  console.log(props)
  const [register, setRegister] = useState<Register>(props.register)
  return(
  <div className='flex justify-center h-screen'>
     <div className=' m-auto text-9xl font-mono'>
      {register}
    </div>
  </div>
  )
}

export default Counter