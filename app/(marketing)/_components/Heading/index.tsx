"use client";

import { ArrowRight } from "lucide-react";
import { SignInButton, useUser } from "@clerk/clerk-react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";

function Heading() {
    const { isSignedIn, isLoaded } = useUser()
    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
                <span className="underline">Notion</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Notion is the connected workspace where <br />
                better, faster work happens.
            </h3>
            {!isLoaded && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isSignedIn && isLoaded && (
                <Button asChild>
                <Link href="/documents">
                    Enter Notion <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
                </Button>
            )}
            {!isSignedIn && isLoaded && (
                <SignInButton mode="modal">
                    <Button>
                        Get Notion free <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    );
}

export default Heading;