"use client";

import { useUser } from "@clerk/nextjs"
import Spinner from "../../Components/Spinner"
import { useRouter } from "next/navigation"
import Navigation from "../../Components/Navigation"
import React from "react"


type Props = {
    children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser()
    const router = useRouter()

    React.useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/")
        }
    }, [isLoaded, isSignedIn, router])

    if (!isLoaded) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!isSignedIn) {
        return null
    }

    return (
        <div className="h-full flex dark:bg-[#1F1F1F]">
            <Navigation />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
        </div>
    )
}

export default MainLayout