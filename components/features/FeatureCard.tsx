"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type FeatureColor =
    | "blue"
    | "violet"
    | "cyan"
    | "emerald"
    | "amber"
    | "pink";

type FeatureCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: FeatureColor;
};

// Tailwind's compiler only picks up classes that
// appear as full literal strings somewhere in the
// source. Building class names with template
// literals (e.g. `text-${color}-400`) means colors
// that never appear literally elsewhere in the
// codebase get silently dropped from the CSS build.
// A static map keeps every class fully spelled out.
const COLOR_CLASSES: Record<
    FeatureColor,
    { wrapper: string; icon: string }
> = {
    blue: {
        wrapper: "border-blue-500/20 bg-blue-500/10",
        icon: "text-blue-400",
    },
    violet: {
        wrapper: "border-violet-500/20 bg-violet-500/10",
        icon: "text-violet-400",
    },
    cyan: {
        wrapper: "border-cyan-500/20 bg-cyan-500/10",
        icon: "text-cyan-400",
    },
    emerald: {
        wrapper: "border-emerald-500/20 bg-emerald-500/10",
        icon: "text-emerald-400",
    },
    amber: {
        wrapper: "border-amber-500/20 bg-amber-500/10",
        icon: "text-amber-400",
    },
    pink: {
        wrapper: "border-pink-500/20 bg-pink-500/10",
        icon: "text-pink-400",
    },
};

export default function FeatureCard({
    icon: Icon,
    title,
    description,
    color,
}: FeatureCardProps) {
    const colorClasses =
        COLOR_CLASSES[color];

    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.25,
            }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
        >
            <div
                className={`mb-6 inline-flex rounded-2xl border p-4 ${colorClasses.wrapper}`}
            >
                <Icon className={`h-7 w-7 ${colorClasses.icon}`} />
            </div>

            <h3 className="text-2xl font-semibold text-white">
                {title}
            </h3>

            <p className="mt-4 leading-7 text-zinc-400">
                {description}
            </p>
        </motion.div>
    );
}