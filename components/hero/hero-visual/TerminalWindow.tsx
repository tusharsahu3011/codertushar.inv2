"use client";

import { motion } from "framer-motion";

export default function TerminalWindow() {
    return (
        <motion.div
            animate={{
                y: [0, 12, 0],
            }}
            transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute bottom-10 right-8 w-[260px] overflow-hidden rounded-2xl border border-white/10 bg-[#050816]/90 shadow-xl transition-all duration-300 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10"
        >
            {/* Header */}
            <div className="border-b border-white/10 px-4 py-3">
                <span className="font-mono text-xs text-zinc-500">
                    terminal
                </span>
            </div>

            {/* Body */}
            <div className="space-y-2 p-4 font-mono text-xs">
                <p className="text-emerald-400">$ git push</p>

                <p className="text-zinc-400">
                    Enumerating objects...
                </p>

                <p className="text-zinc-400">
                    Compressing objects...
                </p>

                <p className="text-zinc-400">
                    Writing objects...
                </p>

                <p className="text-emerald-400">
                    ✓ Deployment Complete
                </p>
            </div>
        </motion.div>
    );
}
