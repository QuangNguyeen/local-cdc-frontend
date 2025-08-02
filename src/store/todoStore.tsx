import { create } from 'zustand';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type TodoStore = {
    todos: Todo[];
    // eslint-disable-next-line no-unused-vars
    addTodo: (text: string) => void;
    // eslint-disable-next-line no-unused-vars
    toggleTodo: (id: number) => void;
    // eslint-disable-next-line no-unused-vars
    removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
    todos: [],
    addTodo: (text) =>
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    text,
                    completed: false,
                },
            ],
        })),
    toggleTodo: (id) =>
        set((state) => ({
            todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
        })),
    removeTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        })),
}));
