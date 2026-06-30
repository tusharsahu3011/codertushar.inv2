import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export default function Heading({
    children,
    className,
    ...props
}: HeadingProps) {
    return (
        <h1
            className={cn(
                "max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.04em] md:text-7xl lg:text-8xl",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
}