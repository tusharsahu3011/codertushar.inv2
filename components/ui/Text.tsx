import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextProps = HTMLAttributes<HTMLParagraphElement>;

export default function Text({
    children,
    className,
    ...props
}: TextProps) {
    return (
        <p
            className={cn(
                "text-lg leading-8 text-zinc-400 md:text-xl",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
}