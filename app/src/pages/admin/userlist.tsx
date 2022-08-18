import type { NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import { Search } from '@/components/Search'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'

type User = {
  id: number
  place_id: string
  number: string
  updated_at: string
  created_at: string
  detail: string
}

type Props = {
  users: User[]
}

export const getServerSideProps = async () => {
  const getUrl = 'http://api:8000/api/users'
  const json = await get(getUrl)
  return {
    props: {
      users: json,
    },
  }
}

const UserList: NextPage<Props> = (props) => {
  const [users, setUsers] = useState<User[]>(props.users)
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12 content-center">
        <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
          <Search className="flex items-center" />
          <div className="flex flex-col sm:border-t sm:border-b sm:divide-y mb-5 sm:mb-8">asdfasdf</div>
          <Table className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {users.map((user) => (
                  <>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.number}
                    </th>
                    <td className="py-4 px-6">{user.created_at}</td>
                    <td className="py-4 px-6">{user.created_at}</td>

                    <td className="py-4 px-6 text-right">
                      <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline">
                        Delete
                      </a>
                    </td>
                  </>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
        {/* <Pagination className="my-4 items-center" /> */}
      </div>
    </AdminLayout>
  )
}

export default UserList
