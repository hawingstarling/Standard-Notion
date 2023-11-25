import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
  });
  

function Logo() {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/logo.svg"
                height={40}
                width={40}
                alt="Logo"
                className="dark:hidden"
            />
            <Image
                src="/logo-dark.svg"
                height={40}
                width={40}
                alt="Logo"
                className="hidden dark:block"
            />
            <p className={`font-semibold ${font.className}`}>Notion</p>
        </div>
    );
}

export default Logo;