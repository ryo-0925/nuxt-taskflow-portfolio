import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Todo } from '@/types/todo'
import TodoList from './TodoList.vue'

const todos: Todo[] = [
  {
    id: 'todo-1',
    title: 'Set up Nuxt project structure',
    completed: true,
    createdAt: '2026-03-10T00:00:00.000Z',
  },
  {
    id: 'todo-2',
    title: 'Wire up Pinia store',
    completed: false,
    createdAt: '2026-03-10T00:10:00.000Z',
  },
  {
    id: 'todo-3',
    title: 'Document component states in Storybook',
    completed: false,
    createdAt: '2026-03-10T00:20:00.000Z',
  },
]

const meta = {
  title: 'Todo/TodoList',
  component: TodoList,
  tags: ['autodocs'],
  args: {
    todos,
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
} satisfies Meta<typeof TodoList>

export default meta
type Story = StoryObj<typeof meta>

export const Populated: Story = {}

export const Empty: Story = {
  args: {
    todos: [],
  },
}
