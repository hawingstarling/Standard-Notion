import Image from "next/image";
import { MainLayout } from "../src/Layouts";
import { useUser } from "@clerk/nextjs" 
import Button from "../src/Components/Button";
import { PlusCircle } from "lucide-react";

function DocumentPage() {
    const { user } = useUser()

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
                <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create a note
                </Button>
            </div>
        </MainLayout>
     );
}

export default DocumentPage;