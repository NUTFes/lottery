import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import { useState } from 'react'
import { Card, CardTitle, CardBody } from '@/components/Card'
import { Button, ButtonNext } from '@/components/Button'
import { Search } from '@/components/Search'

interface Time {
  start: Date
  end: Date
}

interface Place {
  id: number
  name: string
  updated_at: string
  created_at: string
}

interface Props {
  places: Place[]
  time: Time
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/places'
  const getTimeUrl = process.env.SSR_API_URI + '/time'
  const json = await get(getUrl)
  const timeJson = await get(getTimeUrl)
  return {
    props: {
      places: json,
      time: timeJson,
    },
  }
}

const Place: NextPage<Props> = (props) => {
  const [places, setPlaces] = useState<Place[]>(props.places)
  return (
    <AdminLayout time={props.time} className="bg-white lg:pb-12">
      <div className="bg-white py-6 sm:py-8 lg:py-12 dark:bg-gray-800">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl dark:text-white">
              管理者ページ - 場所一覧
            </h2>
            <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is</p>
            <Search></Search>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {places.map((place) => (
              <Card>
                <CardTitle>{place.name}</CardTitle>
                <CardBody>Body</CardBody>
                <ButtonNext href={'/admin/nfc/' + place.id}>次</ButtonNext>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Place
