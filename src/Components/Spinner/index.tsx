import React from "react"
import { Loader } from "lucide-react"
type SpinnerSize = 'default' | 'sm' | 'lg' | 'icon'

interface SpinnerOption {
    size?: SpinnerSize
}

const SPINNER_SIZE: {[key in SpinnerSize]: string} = {
    default: "h-4 w-4",
    sm: "h-2 w-2",
    lg: "h-6 w-6",
    icon: "h-10 w-10",
}

const Spinner = ({ size = 'default' }: SpinnerOption) => {
    return <Loader className={`${SPINNER_SIZE[size]}`} />
}

export default Spinner