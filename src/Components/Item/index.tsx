import { LucideIcon } from "lucide-react";

interface ItemProps {
    label: string,
    onClick: () => void,
    icon: LucideIcon
}

function Item({ label, onClick, icon }: ItemProps) {
    return ( 
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: "12px" }}
        >
            {label}
        </div>
     );
}

export default Item;