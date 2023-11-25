import Navbar from "../../Components/Navbar";

type Props = {
    children?: React.ReactNode
}

const MarketingLayout: React.FC<Props> = ({ children }) => {
    return ( 
        <div className="h-full dark:bg-[#1F1F1F]">
            <Navbar />
            <main className="h-full pt-40">{children}</main>
        </div>
     );
}

export default MarketingLayout;