

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return ( 
        <div 
            className={`animate-pulse rounded-md bg-primary/5, ${className}`}
            {...props}
        />
     );
}

export default Skeleton;