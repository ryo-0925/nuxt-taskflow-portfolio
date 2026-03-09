<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useTodoStore } from '../../stores/todo'
import type { TodoFilter } from '../../types/todo'

const todoStore = useTodoStore()
const { filter, filteredTodos } = storeToRefs(todoStore)

const inputTitle = ref('')

const filters: { label: string; value: TodoFilter }[] = [
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

      <div class="todo__input">
        <input
          v-model="inputTitle"
          type="text"
          placeholder="Add a new task"
          @keyup.enter="handleAddTodo"
        >
        <button @click="handleAddTodo">
          Add
        </button>
      </div>

      <div class="todo__filters">
        <button
          v-for="item in filters"
          :key="item.value"
          :class="{ 'is-active': filter === item.value }"
          @click="todoStore.setFilter(item.value)"
        >
          {{ item.label }}
        </button>
      </div>

      <ul class="todo__list">
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="todo__item"
        >
          <label class="todo__item-main">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="todoStore.toggleTodo(todo.id)"
            >
            <span :class="{ 'is-completed': todo.completed }">
              {{ todo.title }}
            </span>
          </label>

          <button
            class="todo__delete"
            @click="todoStore.deleteTodo(todo.id)"
          >
            Delete
          </button>
        </li>
      </ul>
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

.todo__input button,
.todo__filters button,
.todo__delete {
  padding: 10px 12px;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  background: $color-surface;
  cursor: pointer;
}

.todo__filters {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;
}

.todo__filters .is-active {
  border-color: $color-border-strong;
  font-weight: 600;
}

.todo__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.todo__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: $spacing-md;
  padding: $spacing-md 0;
  border-top: 1px solid $color-border;
}

.todo__item-main {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
}

.is-completed {
  color: $color-text-muted;
  text-decoration: line-through;
}
</style>
