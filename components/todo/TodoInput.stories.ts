import { ref } from 'vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TodoInput from './TodoInput.vue'

const meta = {
  title: 'Todo/TodoInput',
  component: TodoInput,
  tags: ['autodocs'],
  args: {
    modelValue: '',
  },
  render: (args) => ({
    components: { TodoInput },
    setup() {
      const title = ref(args.modelValue)

      return { args, title }
    },
    template: `
      <div style="max-width: 640px;">
        <TodoInput
          :model-value="title"
          @update:model-value="title = $event"
          @add="title = ''"
        />
      </div>
    `,
  }),
} satisfies Meta<typeof TodoInput>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Prefilled: Story = {
  args: {
    modelValue: 'Write Storybook stories',
  },
}
