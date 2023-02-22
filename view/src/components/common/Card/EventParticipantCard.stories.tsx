import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { EventParticipantCard } from '.'

export default {
  title: 'EvnetParticipantCard',
  component: EventParticipantCard,
} as ComponentMeta<typeof EventParticipantCard>

const Template: ComponentStory<typeof EventParticipantCard> = (args) => <EventParticipantCard {...args} />

export const Default: ComponentStory<typeof EventParticipantCard> = Template.bind({})

// Default.args = {
//   // label: 'Default',
//   onClick: () => {
//     alert('クリック')
//   },
// }

Default.storyName = 'Default'
