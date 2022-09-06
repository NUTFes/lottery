import type { NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import { Search } from '@/components/Search'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'

interface User {
  id: number
  number: string
  updated_at: string
  created_at: string
}

interface Time {
  start: Date
  end: Date
}

interface Props {
  users: User[]
  time: Time
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/users'
  const getTimeUrl = process.env.SSR_API_URI + '/time'
  const json = await get(getUrl)
  const timeJson = await get(getTimeUrl)
  return {
    props: {
      users: json,
      time: timeJson,
    },
  }
}

const UserList: NextPage<Props> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users)
  return (
    <AdminLayout time={props.time} className="bg-white lg:pb-12">
      <div className="content-center bg-white py-6 sm:py-8 lg:py-12 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <Search className="flex items-center" />

          <Table className="relative my-5 overflow-x-auto shadow-md sm:rounded-lg dark:border dark:border-gray-700">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Student ID
                </th>
                <th scope="col" className="py-3 px-6">
                  updated at
                </th>
                <th scope="col" className="py-3 px-6">
                  created at
                </th>

                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {user.id}
                  </th>
                  <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {user.number}
                  </th>
                  <td className="py-4 px-6">{user.created_at}</td>
                  <td className="py-4 px-6">{user.created_at}</td>

                  <td className="py-4 px-6 text-right">
                    <a href="#" className="font-medium text-red-600 hover:underline dark:text-blue-500">
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {/* <Pagination className="my-4 items-center" /> */}
      </div>
    </AdminLayout>
  )
}

export default UserList
