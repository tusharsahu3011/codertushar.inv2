import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Exported so link-based CTAs (e.g. external links that must be
// real <a> tags, not <button>s) can reuse the exact same visual
// styles without duplicating Tailwind classes.
export const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    {
        variants: {
            variant: {
                primary:
                    "bg-white text-slate-900 shadow-lg shadow-white/10 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-slate-100",

                secondary:
                    "border border-white/10 bg-white/5 text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10",
            },

            size: {
                sm: "h-10 px-4 text-sm",

                md: "h-12 px-6 text-base",

                lg: "h-14 px-8 text-lg",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

export default function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                buttonVariants({
                    variant,
                    size,
                }),
                className
            )}
            {...props}
        />
    );
}