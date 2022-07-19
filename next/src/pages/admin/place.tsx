import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Place: NextPage = () => {
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">

          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">管理者ページ - 場所一覧</h2>
            <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
          </div>


          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">

            <div className="flex flex-col border rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">体育館前 1</h3>
              <p className="text-gray-500">device_id: 1</p>
              <p className="text-gray-500">メモ: こんにちは</p>
              <p className="text-gray-500">登録日時: 2022-07-18 23:46:57.212203</p>
              <p className="text-gray-500">更新日時: 2022-07-18 23:46:57.212203</p>
              <a href="#" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a>
            </div>
   
            <div className="flex flex-col border rounded-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-semibold mb-2">体育館前 2</h3>
              <p className="text-gray-500">device_id: 2</p>
              <p className="text-gray-500">メモ: こんにちは</p>
              <p className="text-gray-500">登録日時: 2022-07-18 23:46:57.212203</p>
              <p className="text-gray-500">更新日時: 2022-07-18 23:46:57.212203</p>
              <a href="#" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-bold transition duration-100 mt-auto">More</a>
            </div>


          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Place