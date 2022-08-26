/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { Card } from '@/components/Card'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Admin: NextPage = () => {
  const [todos, setTodos] = useState<string[]>([])
  const [tmpTodo, setTmpTodo] = useState('')
  const addTodo = () => {
    setTodos([...todos, tmpTodo])
    setTmpTodo('')
  }
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="/admin/lottery"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    抽選画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/lottery"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a href="/admin/nfc" className="transition duration-100 hover:text-indigo-500 active:text-indigo-600">
                    NFC確認画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/nfc-places"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/place"
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="/admin/place"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    場所一覧 画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/place"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="/admin/userlist"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    ユーザー一覧 画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/userlist"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/usercount"
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="/admin/usercount"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    参加人数 確認画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/usercount"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
              <a
                href="/admin/winner"
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
                <h2 className="text-xl font-bold text-gray-800">
                  <a
                    href="/admin/winner"
                    className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                  >
                    当選者 確認画面
                  </a>
                </h2>

                <p className="text-gray-500">
                  This is a section of some simple filler text, also known as placeholder text.
                </p>

                <div>
                  <a
                    href="/admin/winner"
                    className="font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Admin
