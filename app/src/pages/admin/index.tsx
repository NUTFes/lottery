/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Card } from '@/components/Card'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button, ButtonNext } from '@/components/Button'

const Admin: NextPage = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [tmpTodo, setTmpTodo] = useState('')
  const addTodo = () => {
    setTodos([...todos, tmpTodo])
    setTmpTodo('')
  }
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 dark:bg-gray-800 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/lottery"
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="/static/images/bg-4-3.png"
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <a
                    href="/admin/lottery"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    抽選画面
                  </a>
                </h2>

                <p className="text-gray-500">抽選画面です。ページ遷移と同時に抽選結果を取得します。</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/nfc"
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Lorenzo Herrera"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <a href="/admin/nfc" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
                    NFC確認画面
                  </a>
                </h2>

                <p className="text-gray-500">NFCの読み取りを行います。受付場所ごとにIDが異なります。</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/userlist"
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Magicle"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <a
                    href="/admin/userlist"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    ユーザー一覧
                  </a>
                </h2>

                <p className="text-gray-500">ユーザーの一覧をAPIから取得し，表示します。</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/userlist"
                className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40"
              >
                <img
                  src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600"
                  loading="lazy"
                  alt="Photo by Martin Sanchez"
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>

              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  <a
                    href="/admin/winner"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    当選者一覧
                  </a>
                </h2>

                <p className="text-gray-500">当選者一覧をAPIから取得し，表示します。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin
