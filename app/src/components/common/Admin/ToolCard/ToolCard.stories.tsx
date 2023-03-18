import type { ComponentStory, ComponentMeta } from '@storybook/react'
import ToolCard  from './ToolCard'

export default {
  title: 'ToolCard',
  component: ToolCard,
} as ComponentMeta<typeof ToolCard>

const Template: ComponentStory<typeof ToolCard> = () => <ToolCard />

export const Default: ComponentStory<typeof ToolCard> = Template.bind({})

Default.storyName = 'デフォルト'
