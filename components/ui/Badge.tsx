import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLDivElement>;

export default function Badge({
    children,
    className,
    ...props
}: BadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}