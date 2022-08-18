import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const UserList: NextPage = () => {
  return (
  <AdminLayout className="bg-white lg:pb-12">
    <div className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
      <div className="mb-6 sm:mb-10 lg:mb-16">
      <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">管理者ページ - ユーザーリスト</h2>
      </div>

      <div className="flex flex-col sm:border-t sm:border-b sm:divide-y mb-5 sm:mb-8">

      <div className="py-5 sm:py-1">
        <div className="flex flex-wrap gap-4 lg:gap-6 sm:py-2.5">
          <div className="sm:-my-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className=" w-16 sm:w-16 h-16 sm:h-16 fill-gray-500"  viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <a href="#" className="inline-block text-gray-800 hover:text-gray-500 text-lg lg:text-xl font-bold transition duration-100 mb-1">20301789</a>
              <span className="block text-gray-500">user_id: 1</span>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <span className="block text-gray-500">登録日時: 2022-07-18 23:46:57.212203</span>
              <span className="block text-gray-500">更新日時: 2022-07-18 23:46:57.212203</span>
            </div>
          </div>

          <div className="w-full sm:w-auto flex justify-between border-t sm:border-none pt-4 sm:pt-0">
            <div className="flex flex-col items-start gap-2">
              <button className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold select-none transition duration-100">Delete</button>
            </div>
          </div>
        </div>
      </div>

      </div>


    </div>
    </div>
  </AdminLayout>
  )
}

export default UserList