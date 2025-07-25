"use client"
import { Button } from "@/components/ui/button"

export default function HomePage() {

    return (
        <main className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <Button className="drak">Dark</Button>
            <Button className="light">Light</Button>
        </main>
    )
}