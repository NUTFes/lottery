import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <h1>管理者ページ - 参加者一覧</h1>
    </AdminLayout>
  )
}

export default Home