import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { TodoFilterOption } from '@/types/todo'
import TodoFilter from './TodoFilter.vue'

const filters: TodoFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

const meta = {
  title: 'Todo/TodoFilter',
  component: TodoFilter,
  tags: ['autodocs'],
  args: {
    activeFilter: 'all',
    filters,
  },
  argTypes: {
    activeFilter: {
      control: 'inline-radio',
      options: filters.map((filter) => filter.value),
    },
  },
} satisfies Meta<typeof TodoFilter>

export default meta
type Story = StoryObj<typeof meta>

export const All: Story = {}

export const Active: Story = {
  args: {
    activeFilter: 'active',
  },
}

export const Completed: Story = {
  args: {
    activeFilter: 'completed',
  },
}
