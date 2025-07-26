"use client"
import { Button } from "@/components/ui/button"

export default function HomePage() {
    return (
        <main className="flex min-h-screen gap-2 items-center justify-center bg-background">
            <Button className="drak">Dark</Button>
            <Button className="light">Light</Button>
        </main>
    )
}