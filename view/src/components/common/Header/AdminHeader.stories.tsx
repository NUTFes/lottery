import type { ComponentStory, ComponentMeta } from '@storybook/react'
import { AdminHeader } from '.'

export default {
  title: 'AdminHeader',
  component: AdminHeader,
} as ComponentMeta<typeof AdminHeader>

const Template: ComponentStory<typeof AdminHeader> = (args) => <AdminHeader {...args} />

export const Default: ComponentStory<typeof AdminHeader> = Template.bind({})

Default.storyName = 'デフォルト'
