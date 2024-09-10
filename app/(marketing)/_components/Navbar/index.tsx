"use client";

import { SignInButton, useUser, UserButton } from "@clerk/nextjs";
import Logo from "../Logo";
import { useScrollTop } from "../../../../src/hook";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import Spinner from "@/components/Spinner";

function Navbar() {
    const { isSignedIn, isLoaded } = useUser()
    
    const scrolled = useScrollTop()

    return ( 
        <div className={`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 ${scrolled && 'border-b shadow-sm'}`}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {!isLoaded && <Spinner />}
                {!isSignedIn && isLoaded && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button size="sm">Get Notion free</Button>
                        </SignInButton>
                    </>
                )}
                {isSignedIn && isLoaded && (
                    <>
                        <Button variant="default" size="sm" asChild>
                            <Link href="/documents">Enter Notion</Link>
                        </Button>
                        <UserButton afterSignOutUrl="/" />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
     );
}

export default Navbar;