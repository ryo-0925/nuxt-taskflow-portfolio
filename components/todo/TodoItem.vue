<script setup lang="ts">
import type { Todo } from '@/types/todo'

type Props = {
  todo: Todo
}

defineProps<Props>()

const emit = defineEmits<{
  toggle: [id: string]
  delete: [id: string]
}>()
</script>

<template>
  <li class="todo-item">
    <label class="todo-item__main">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id)"
      >
      <span :class="{ 'is-completed': todo.completed }">
        {{ todo.title }}
      </span>
    </label>

    <button
      class="todo-item__delete"
      @click="emit('delete', todo.id)"
    >
      Delete
    </button>
  </li>
</template>

<style lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md 0;
  border-top: 1px solid $color-border;
}

.todo-item__main {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.todo-item__delete {
  padding: 10px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  cursor: pointer;
}

.is-completed {
  color: $color-text-muted;
  text-decoration: line-through;
}
</style>
