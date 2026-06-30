"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
};

export default function FeatureCard({
    icon: Icon,
    title,
    description,
    color,
}: FeatureCardProps) {
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
                className={`mb-6 inline-flex rounded-2xl border border-${color}-500/20 bg-${color}-500/10 p-4`}
            >
                <Icon className={`h-7 w-7 text-${color}-400`} />
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