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

<style scoped>
.page {
  min-height: 100vh;
  padding: 40px 16px;
  background: #f5f7fb;
}

.todo {
  max-width: 640px;
  margin: 0 auto;
  padding: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.todo__title {
  margin: 0 0 8px;
  font-size: 32px;
}

.todo__description {
  margin: 0 0 24px;
  color: #4b5563;
}

.todo__input {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.todo__input input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
}

.todo__input button,
.todo__filters button,
.todo__delete {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.todo__filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.todo__filters .is-active {
  border-color: #111827;
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
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #e5e7eb;
}

.todo__item-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.is-completed {
  color: #9ca3af;
  text-decoration: line-through;
}
</style>
