import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs" 
import { MainLayout } from "../src/Layouts";
import { PlusCircle } from "lucide-react";
import { CreateNewDocument } from "../src/services/api/document";
import { toast } from "sonner";
import { Button } from "@/Components/ui/button";

interface UseUserT {
    isLoaded: boolean,
    isSignedIn: boolean,
    user: { id: string, firstName: string }
}

function DocumentPage() {
    const { user } = useUser() as UseUserT
    async function FetchApiDocument() {
        try {
            if (!user.id) {
                return new Error('Unauthenticated')
            }

            let promise = CreateNewDocument({
                title: "Untitled", 
            })

            console.log(promise);
            

            toast.promise(promise, {
                loading: 'Creating a new note...',
                success: 'New note created!',
                error: 'Failed to create a new note.',
            })

            let result = await promise

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onCreate = () => {
        FetchApiDocument()
    }

    return ( 
        <MainLayout>
            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Image 
                    src="/empty.png"
                    height={300}
                    width={300}
                    alt="Empty"
                    className="dark:hidden"
                />
                <Image 
                    src="/empty-dark.png"
                    height={300}
                    width={300}
                    alt="Empty"
                    className="hidden dark:block"
                />
                <h2 className="text-lg font-medium">
                    Welcome to {user?.firstName}&apos;s Standard Notion
                </h2>
                <Button onClick={onCreate}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a note
                </Button>
            </div>
        </MainLayout>
     );
}

export default DocumentPage;