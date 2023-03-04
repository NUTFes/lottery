import type { ComponentStory, ComponentMeta } from '@storybook/react'
import EventCard from './EventCard'
import { EventCardProps } from './EventCard.type'

//icons
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EventIcon from '@mui/icons-material/Event'
import ListAltIcon from '@mui/icons-material/ListAlt'

export default {
  title: 'EvnetCard',
  component: EventCard,
} as ComponentMeta<typeof EventCard>

const Template: ComponentStory<typeof EventCard> = (args: EventCardProps) => <EventCard {...args} />

export const Default: ComponentStory<typeof EventCard> = Template.bind({})

Default.args = {
  eventList: [
    {
      name: 'home',
      displayName: 'ホーム',
      icon: <HomeIcon />,
      url: '/',
      openingTime: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
      closingTime: new Date(2024, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      name: 'eventList',
      displayName: 'イベント一覧',
      icon: <EventIcon />,
      url: '/',
      openingTime: new Date(2024, 5 - 1, 5, 6, 35, 20, 333),
      closingTime: new Date(2025, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      name: 'participantList',
      displayName: '参加者一覧',
      icon: <ListAltIcon />,
      url: '/',
      openingTime: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
      closingTime: new Date(2023, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      name: 'participantEventRegistration',
      displayName: '参加者・イベント登録',
      icon: <PersonAddIcon />,
      url: '/',
      openingTime: new Date(2022, 5 - 1, 5, 6, 35, 20, 333),
      closingTime: new Date(2024, 5 - 1, 5, 6, 35, 20, 333),
    },
    {
      name: 'setting',
      displayName: '設定',
      icon: <SettingsIcon />,
      url: '/',
      openingTime: new Date(),
      closingTime: new Date(),
    },
  ],
}

Default.storyName = 'デフォルト'
