import { Slot } from "@radix-ui/react-slot"
import React from "react"

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

interface ButtonOptions {
    variant?: ButtonVariant,
    size?: ButtonSize,
    asChild?: boolean
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonOptions

const BUTTON_SIZE: {[key in ButtonSize]: string} = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
}

const BUTTON_VARIANT: {[key in ButtonVariant]: string} = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    'outline':
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
        
    const Comp = asChild ? Slot : 'button'
    return (
        <Comp
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${BUTTON_SIZE[size]} ${BUTTON_VARIANT[variant]} ${className}`}
            ref={ref}
            {...props}
        />
    )
})

Button.displayName = "Button"

export default Button;