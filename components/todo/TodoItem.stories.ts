import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Todo } from '@/types/todo'
import TodoItem from './TodoItem.vue'

const baseTodo: Todo = {
  id: 'todo-1',
  title: 'Build a reusable Todo item',
  completed: false,
  createdAt: '2026-03-10T00:00:00.000Z',
}

const meta = {
  title: 'Todo/TodoItem',
  component: TodoItem,
  tags: ['autodocs'],
  args: {
    todo: baseTodo,
  },
  decorators: [
    () => ({
      template: `
        <div style="max-width: 640px; background: white; padding: 24px; border: 1px solid #d1d5db; border-radius: 16px;">
          <story />
        </div>
      `,
    }),
  ],
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Active: Story = {}

export const Completed: Story = {
  args: {
    todo: {
      ...baseTodo,
      completed: true,
    },
  },
}
