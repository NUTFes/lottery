import type { ComponentStory, ComponentMeta } from '@storybook/react'
import EventParticpantCard from './EventParticpantCard'
import { EventParticpantCardProps } from './EventParticpantCard.type'

export default {
  title: 'EventParticpantCard',
  component: EventParticpantCard,
} as ComponentMeta<typeof EventParticpantCard>

const Template: ComponentStory<typeof EventParticpantCard> = (args: EventParticpantCardProps) => (
  <EventParticpantCard {...args} />
)

export const Default: ComponentStory<typeof EventParticpantCard> = Template.bind({})

Default.args = {
  userList: [
    {
      id: 1,
      name: '技大花子',
      number: 11111111,
      created_at: 11111111,
      updated_at: 11111111,
    },
    {
      id: 2,
      name: '技大太郎',
      number: 22222222,
      created_at: 22222222,
      updated_at: 22222222,
    },
  ],
}

Default.storyName = 'デフォルト'
