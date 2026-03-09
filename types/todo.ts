export type TpdoFilter = 'all' | 'active' | 'completed';

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}