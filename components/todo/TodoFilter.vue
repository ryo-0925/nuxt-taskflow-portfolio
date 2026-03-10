<script setup lang="ts">
import type { TodoFilter, TodoFilterOption } from '@/types/todo'

type Props = {
  activeFilter: TodoFilter
  filters: TodoFilterOption[]
}

defineProps<Props>()

const emit = defineEmits<{
  select: [value: TodoFilter]
}>()
</script>

<template>
  <div class="todo-filters">
    <button
      v-for="item in filters"
      :key="item.value"
      :class="{ 'is-active': activeFilter === item.value }"
      @click="emit('select', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style lang="scss">
.todo-filters {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;

  button {
    padding: 10px 12px;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-surface;
    cursor: pointer;
  }

  .is-active {
    border-color: $color-border-strong;
    font-weight: 600;
  }
}
</style>
