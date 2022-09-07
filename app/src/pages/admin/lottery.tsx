import type { NextPage } from 'next'
import { useState } from 'react'
import LotteryLayout from '@/components/LotteryLayout'
import Odometer from '@/components/Odometer'
import { get } from '@/utils/api_methods'

type User = {
  id: number
  number: string
  updated_at: string
  created_at: String
}

type Props = {
  users: User[]
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/random'
  const json = await get(getUrl)
  return {
    props: {
      users: json,
    },
  }
}

const Lottery: NextPage<Props> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users)
  return (
    <LotteryLayout>
      {users.map((user) => (
        <Odometer value={user.number}></Odometer>
      ))}
    </LotteryLayout>
  )
}

export default Lottery
