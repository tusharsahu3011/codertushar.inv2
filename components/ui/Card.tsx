import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({
    children,
    className,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-3xl border border-white/10 bg-[#050816]/80 shadow-2xl backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}