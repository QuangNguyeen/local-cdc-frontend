'use client';
import TodoPage from '@/components/Todo';

export default function HomePage() {
    return (
        <main className="bg-background flex min-h-screen items-center justify-center gap-2">
            <TodoPage />
        </main>
    );
}
