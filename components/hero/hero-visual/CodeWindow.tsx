"use client";

import { motion } from "framer-motion";

export default function CodeWindow() {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            className="absolute left-8 top-8 w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/90 shadow-xl transition-all duration-300 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10"
        >
            {/* Window Header */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="ml-3 text-xs text-zinc-500">
                    app.tsx
                </span>
            </div>

            {/* Code */}
            <div className="space-y-2 p-5 font-mono text-sm">
                <p>
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-cyan-300">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-zinc-300">{"{"}</span>
                </p>

                <p className="pl-5">
                    <span className="text-emerald-400">name</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-amber-300">
                        {`"Coder Tushar"`}
                    </span>,
                </p>

                <p className="pl-5">
                    <span className="text-emerald-400">status</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-amber-300">
                        {`"Building"`}
                    </span>,
                </p>

                <p className="pl-5">
                    <span className="text-emerald-400">launch</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-amber-300">
                        {`"Soon"`}
                    </span>,
                </p>

                <p>
                    <span className="text-zinc-300">{"}"}</span>
                </p>
            </div>
        </motion.div>
    );
}
