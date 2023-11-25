import { SignInButton } from "@clerk/clerk-react";
import Button from "../Button";
import Logo from "../Logo";
import { useScrollTop } from "../../hook";
import { ModeToggle } from "../ModeToggle";


function Navbar() {
    const scrolled = useScrollTop()

    return ( 
        <div className={`z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 ${scrolled && 'border-b shadow-sm'}`}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {/* <SignInButton mode="modal"> */}
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                {/* </SignInButton> */}
                {/* <SignInButton mode="modal"> */}
                    <Button size="sm">Get Notion free</Button>
                {/* </SignInButton> */}
                <ModeToggle />
            </div>
        </div>
     );
}

export default Navbar;