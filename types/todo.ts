export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoFilterOption {
    label: string;
    value: TodoFilter;
}

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}
