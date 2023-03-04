import type { ComponentStory, ComponentMeta } from '@storybook/react'
import EventParticipantCard from './EventParticipantCard'
import { EventParticipantCardProps } from './EventParticipantCard.type'

export default {
  title: 'EvnetParticipantCard',
  component: EventParticipantCard,
} as ComponentMeta<typeof EventParticipantCard>

const Template: ComponentStory<typeof EventParticipantCard> = (args: EventParticipantCardProps) => (
  <EventParticipantCard {...args} />
)

export const Default: ComponentStory<typeof EventParticipantCard> = Template.bind({})

Default.args = {
  participantCount: 130,
  participantParsent: 10,
  participantType: 'all',
}

Default.storyName = 'デフォルト'
