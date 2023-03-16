import React from 'react'
import MainLayout from '@components/layout/MainLayout'
import EventCard from '@components/common/Admin/EventCard/EventCard'
import { get } from '@utils/api_methods'
import Box from '@mui/material/Box'

import EventIcon from '@mui/icons-material/Event'
import ToolCard from '@components/common/Admin/ToolCard/ToolCard'

interface Event {
  id: number
  name: string
  description: string
  max_attendee: number
  start_at: string
  end_at: string
  created_at: string
  updated_at: string
}

interface Props {
  eventList: Event[]
}

export async function getServerSideProps() {
  const getUrl = process.env.SSR_API_URI + '/events'
  const json = await get(getUrl)
  return {
    props: {
      eventList: json,
    },
  }
}

const Home = (props: Props) => {
  const eventList = props.eventList.map((event) => ({
    name: event.name,
    displayName: event.name,
    icon: <EventIcon />,
    url: '/',
    openingTime: new Date(Date.parse(event.start_at)),
    closingTime: new Date(Date.parse(event.end_at)),
  }))

  return (
    <>
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '5rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5rem',
              width: '25%',
              my: '5rem',
              mx: '5rem',
            }}
          >
            <ToolCard />
            <EventCard eventList={eventList}></EventCard>
          </Box>
        </Box>
      </MainLayout>
    </>
  )
}

export default Home
