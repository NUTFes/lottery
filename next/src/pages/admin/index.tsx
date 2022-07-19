import type { NextPage } from 'next'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Admin : NextPage = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [tmpTodo, setTmpTodo] = useState("");
  const addTodo = () => {
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  }
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="max-w-screen-xl px-4 md:px-8 mx-auto">

          <div className="mb-10 md:mb-16">
            <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">管理者画面</h2>
            <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
          </div>


          <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 sm:gap-12 xl:gap-16">

            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/lottery" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="/static/images/bg-4-3.png" loading="lazy" alt="Photo by Minh Pham" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/lottery" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">抽選画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/lottery" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
                </div>
              </div>
            </div>


            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/nfc" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Lorenzo Herrera" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/nfc" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">NFC確認画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/nfc" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
                </div>
              </div>
            </div>



            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/place" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="https://images.unsplash.com/photo-1542759564-7ccbb6ac450a?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Magicle" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/place" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">場所一覧 画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/place" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
                </div>
              </div>
            </div>


            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/userlist" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Martin Sanchez" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/userlist" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">ユーザー一覧 画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/userlist" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/usercount" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Martin Sanchez" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/usercount" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">参加人数 確認画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/usercount" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 lg:gap-6">
              <a href="/admin/winner" className="group w-full md:w-24 lg:w-40 h-56 md:h-24 lg:h-40 block self-start shrink-0 bg-gray-100 overflow-hidden rounded-lg shadow-lg relative">
                <img src="https://images.unsplash.com/photo-1610465299996-30f240ac2b1c?auto=format&q=75&fit=crop&w=600" loading="lazy" alt="Photo by Martin Sanchez" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
              </a>

              <div className="flex flex-col gap-2">

                <h2 className="text-gray-800 text-xl font-bold">
                  <a href="/admin/winner" className="hover:text-indigo-500 active:text-indigo-600 transition duration-100">当選者 確認画面</a>
                </h2>

                <p className="text-gray-500">This is a section of some simple filler text, also known as placeholder text.</p>

                <div>
                  <a href="/admin/winner" className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 font-semibold transition duration-100">Read more</a>
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
