import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import { Card, CardTitle, CardBody } from '@/components/Card'
import { Button, ButtonNext } from '@/components/Button'
import { Search } from '@/components/Search'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Place: NextPage = () => {
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
              管理者ページ - 場所一覧
            </h2>
            <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">This is</p>
            <Search></Search>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            <Card>
              <CardTitle>体育館前-1</CardTitle>
              <CardBody>Body</CardBody>
              <ButtonNext href="#">次</ButtonNext>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Place
