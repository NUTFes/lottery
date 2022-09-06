import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

interface Time {
  start: Date
  end: Date
}

interface Props {
  time: Time
}

export const getServerSideProps = async () => {
  const getTimeUrl = process.env.SSR_API_URI + '/time'
  const timeJson = await get(getTimeUrl)
  return {
    props: {
      time: timeJson,
    },
  }
}
 
const Home: NextPage = (props: Props) => {
  return (
    <AdminLayout time={props.time} className="bg-white lg:pb-12">
      <h1>管理者ページ - 参加者一覧</h1>
    </AdminLayout>
  )
}

export default Home
