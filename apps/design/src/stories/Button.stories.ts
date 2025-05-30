import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@indieverse/ui/button'

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: 'string',
      value: 'Button',
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'secondary', 'link'],
    },
    size: {
      control: { type: 'radio' },
      options: ['default', 'sm', 'lg'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const Secondary: Story = {
  args: {},
}

export const Large: Story = {
  args: {},
}

export const Small: Story = {
  args: {},
}
