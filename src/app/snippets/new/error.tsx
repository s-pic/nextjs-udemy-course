"use client"

interface ErrorPageProps {
    error: Error
    // refreshes the route
    reset: () => void
}

export default function ErrorPage() {
    return "OOOps"
}