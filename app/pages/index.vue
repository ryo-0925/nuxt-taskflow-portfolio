<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import type { TodoFilterOption } from '@/types/todo'

import TodoFilter from '@/components/todo/TodoFilter.vue'
import TodoInput from '@/components/todo/TodoInput.vue'
import TodoList from '@/components/todo/TodoList.vue'

const todoStore = useTodoStore()
const { filter, filteredTodos } = storeToRefs(todoStore)

const inputTitle = ref('')

const filters: TodoFilterOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

const handleAddTodo = () => {
  todoStore.addTodo(inputTitle.value)
  inputTitle.value = ''
}
</script>

<template>
  <main class="page">
    <section class="todo">
      <h1 class="todo__title">Taskflow</h1>
      <p class="todo__description">
        A Nuxt 3 portfolio project for learning state management and frontend architecture.
      </p>
      <TodoInput
        v-model="inputTitle"
        @add="handleAddTodo"
      />
      <TodoFilter
        :active-filter="filter"
        :filters="filters"
        @select="todoStore.setFilter"
      />

      <TodoList
        :todos="filteredTodos"
        @toggle="todoStore.toggleTodo"
        @delete="todoStore.deleteTodo"
      />
    </section>
  </main>
</template>

<style scoped lang="scss">
.page {
  min-height: 100vh;
  padding: $spacing-xl $spacing-sm;
  background: $color-bg;
}

.todo {
  max-width: 640px;
  margin: 0 auto;
  padding: $spacing-lg;
  background: $color-surface;
  border: 1px solid $color-border;
  border-radius: $radius-lg;
}

.todo__title {
  margin: 0 0 $spacing-sm;
  font-size: 32px;
}

.todo__description {
  margin: 0 0 $spacing-lg;
  color: $color-text-muted;
}

.todo__input {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.todo__input input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-md;
}

.todo__input button {
  padding: 10px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  cursor: pointer;
}
</style>
