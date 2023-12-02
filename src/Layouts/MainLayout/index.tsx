import { useUser } from "@clerk/clerk-react"
import Spinner from "../../Components/Spinner"
import { redirect } from "next/navigation"
import Navigation from "../../Components/Navigation"


type Props = {
    children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser()

    if (!isLoaded) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }

    if (!isSignedIn) return redirect("/")

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