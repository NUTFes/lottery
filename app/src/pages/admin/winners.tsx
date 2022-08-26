import type { NextPage } from 'next'
import React from 'react'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import { Search } from '@/components/Search'
import Table from '@/components/Table'

type Winner = {
  id: number
  place_id: string
  number: string
  updated_at: string
  created_at: string
  detail: string
}

type Props = {
  winners: Winner[]
}

export const getServerSideProps = async () => {
  const getUrl = 'http://api:8000/api/winners'
  const json = await get(getUrl)
  return {
    props: {
      winners: json,
    },
  }
}

const Winner: NextPage<Props> = (props) => {
  const [winners, setWinners] = useState<Winner[]>(props.winners)
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="content-center bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <Search className="flex items-center" />
          <div className="mb-5 flex flex-col sm:mb-8 sm:divide-y sm:border-t sm:border-b">asdfasdf</div>
          <Table className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
              <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                {winners.map((winner) => (
                  <>
                    <th scope="row" className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white">
                      {winner.number}
                    </th>
                    <td className="py-4 px-6">{winner.created_at}</td>
                    <td className="py-4 px-6">{winner.created_at}</td>

                    <td className="py-4 px-6 text-right">
                      <a href="#" className="font-medium text-red-600 hover:underline dark:text-blue-500">
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

export default Winner
