import type { NextPage } from 'next'
import AdminLayout from '@/components/AdminLayout'
import { get } from '@/utils/api_methods'
import { useState } from 'react'
import { Card, CardTitle, CardBody } from '@/components/Card'
import { Button, ButtonNext } from '@/components/Button'
import { Search } from '@/components/Search'

type Place = {
  id: number
  name: string
  updated_at: string
  created_at: string
}

type Props = {
  places: Place[]
}

export const getServerSideProps = async () => {
  const getUrl = process.env.SSR_API_URI + '/places'
  const json = await get(getUrl)
  return {
    props: {
      places: json,
    },
  }
}

const Place: NextPage<Props> = (props) => {
  const [places, setPlaces] = useState<Place[]>(props.places)
  return (
    <AdminLayout className="bg-white lg:pb-12">
      <div className="bg-white py-6 dark:bg-gray-800 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 dark:text-white md:mb-6 lg:text-3xl">
              管理者ページ - 場所一覧
            </h2>
            <Search className="flex items-center"></Search>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
            {places.map((place) => (
              <Card>
                <CardTitle>{place.name}</CardTitle>
                <div className="flex justify-end">
                  <ButtonNext href={'/admin/nfc/' + place.id}>次</ButtonNext>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Place
