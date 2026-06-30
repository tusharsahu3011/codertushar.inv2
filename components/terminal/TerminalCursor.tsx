"use client";

import { motion } from "framer-motion";

export default function TerminalCursor() {
    return (
        <motion.span
            animate={{
                opacity: [1, 0, 1],
            }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
            }}
            className="ml-1 inline-block h-5 w-[2px] bg-emerald-400 align-middle"
        />
    );
}