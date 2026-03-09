<script setup lang="ts">
import type { Todo } from '@/types/todo'
import TodoItem from './TodoItem.vue'

type Props = {
  todos: Todo[]
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <ul class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="emit('toggle', $event)"
      @delete="emit('delete', $event)"
    />
  </ul>
</template>

<style lang="scss">
.todo-list {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
