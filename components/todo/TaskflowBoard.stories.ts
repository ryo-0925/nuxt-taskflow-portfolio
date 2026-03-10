import { computed, ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { Todo, TodoFilter, TodoFilterOption } from '@/types/todo'
import TodoFilter from './TodoFilter.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'

const filters: TodoFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

const initialTodos: Todo[] = [
  {
    id: 'todo-1',
    title: 'Review current UI states',
    completed: true,
    createdAt: '2026-03-10T00:00:00.000Z',
  },
  {
    id: 'todo-2',
    title: 'Replace Storybook starter stories',
    completed: false,
    createdAt: '2026-03-10T00:10:00.000Z',
  },
  {
    id: 'todo-3',
    title: 'Keep only project-specific stories',
    completed: false,
    createdAt: '2026-03-10T00:20:00.000Z',
  },
]

const meta = {
  title: 'Todo/TaskflowBoard',
  tags: ['autodocs'],
  render: () => ({
    components: {
      TodoFilter,
      TodoInput,
      TodoList,
    },
    setup() {
      const title = ref('')
      const activeFilter = ref<TodoFilter>('all')
      const todos = ref<Todo[]>([...initialTodos])

      const visibleTodos = computed(() => {
        switch (activeFilter.value) {
          case 'active':
            return todos.value.filter((todo) => !todo.completed)
          case 'completed':
            return todos.value.filter((todo) => todo.completed)
          default:
            return todos.value
        }
      })

      const addTodo = () => {
        const nextTitle = title.value.trim()
        if (!nextTitle) {
          return
        }

        todos.value.unshift({
          id: `todo-${todos.value.length + 1}`,
          title: nextTitle,
          completed: false,
          createdAt: new Date().toISOString(),
        })
        title.value = ''
      }

      const toggleTodo = (id: string) => {
        const target = todos.value.find((todo) => todo.id === id)
        if (!target) {
          return
        }

        target.completed = !target.completed
      }

      const deleteTodo = (id: string) => {
        todos.value = todos.value.filter((todo) => todo.id !== id)
      }

      return {
        activeFilter,
        addTodo,
        deleteTodo,
        filters,
        title,
        toggleTodo,
        visibleTodos,
      }
    },
    template: `
      <main class="page">
        <section class="todo">
          <h1 class="todo__title">Taskflow</h1>
          <p class="todo__description">
            A Nuxt 3 portfolio project for learning state management and frontend architecture.
          </p>
          <TodoInput
            :model-value="title"
            @update:model-value="title = $event"
            @add="addTodo"
          />
          <TodoFilter
            :active-filter="activeFilter"
            :filters="filters"
            @select="activeFilter = $event"
          />
          <TodoList
            :todos="visibleTodos"
            @toggle="toggleTodo"
            @delete="deleteTodo"
          />
        </section>
      </main>
    `,
  }),
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
