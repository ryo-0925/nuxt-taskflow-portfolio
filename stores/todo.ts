import { defineStore } from 'pinia';
import { computed, ref } from "vue";
import type { Todo, TodoFilter } from "~/types/todo";

export const userTodoStore = defineStore('userTodo', () => {
    const todos = ref<Todo[]>([]);
    const filter = ref<TodoFilter>('all');

    const filteredTodos = computed(() => {
        switch (filter.value) {
            case 'active':
                return todos.value.filter(todo => !todo.completed);
            case 'completed':
                return todos.value.filter(todo => todo.completed);
            case 'all':
            default:
                return todos.value;
        }
    });

    // ToDoの追加
    const addTodo = (title: string) => {
        const trimmedTitle = title.trim()
        if(!trimmedTitle) return

        todos.value.unshift({
            id: crypto.randomUUID(),
            title: trimmedTitle,
            completed: false,
            createdAt: new Date().toISOString(),
        })
    }

    // ToDoの切り替え
    const toggleTodo = (id: string) => {
        const target = todos.value.find(todo => todo.id === id);
        if(!target) return

        target.completed = !target.completed;
    }

    // ToDoの削除
    cpnst deleteTodo = (id: string) => {
        todos.value = todos.value.filter(todo => todo.id !== id);
    }

    // フィルターの切り替え
    const setFilter = (nextFilter: TodoFilter) => {
        filter.value = nextFilter;
    }

    return {
        todos,
        filter,
        filteredTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        setFilter,
    }
})
