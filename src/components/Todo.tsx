'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useTodoStore } from '@/store/todoStore';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function TodoPage() {
    const [text, setText] = useState('');
    const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore();

    const handleAdd = () => {
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-xl space-y-4">
            <h1 className="text-center text-2xl font-bold">📝 Todo App</h1>

            {/* Input + Button */}
            <div className="flex gap-2">
                <Input
                    placeholder="Thêm công việc..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleAdd}>Thêm</Button>
            </div>

            {todos.length === 0 ? (
                <p className="text-muted-foreground text-center">Chưa có công việc nào.</p>
            ) : (
                todos.map((todo) => (
                    <Card key={todo.id} className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center gap-2">
                            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(todo.id)} />
                            <span className={todo.completed ? 'text-muted-foreground line-through' : ''}>
                                {todo.text}
                            </span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </Card>
                ))
            )}
        </div>
    );
}
