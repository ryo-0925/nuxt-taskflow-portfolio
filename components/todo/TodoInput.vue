<script setup lang="ts">
type Props = {
  modelValue: string
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  add: []
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleAdd = () => {
  emit('add')
}
</script>

<template>
  <div class="todo-input">
    <input
      :value="modelValue"
      type="text"
      placeholder="Add a new task"
      @input="handleInput"
      @keyup.enter="handleAdd"
    />
    <button @click="handleAdd">
      Add
    </button>
  </div>
</template>

<style lang="scss">
.todo-input {
  display: flex;
  gap: $spacing-sm;
  margin-bottom: $spacing-md;

  input {
    flex: 1;
    padding: 10px 12px;
    border: 1px solid $color-border;
    border-radius: $radius-md;
  }

  button {
    padding: 10px 12px;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    background: $color-surface;
  }
}
</style>
