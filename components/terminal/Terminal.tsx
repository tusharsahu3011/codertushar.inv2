"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const lines = [
    "$ npm run dev",
    "▲ Next.js 16",
    "Creating an amazing developer experience...",
    "Building UI components...",
    "Optimizing performance...",
    "Launching codertushar.in...",
    "✓ Ready in 1.2s",
];

export default function Terminal() {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        let current = 0;

        const timer = setInterval(() => {
            current++;

            setVisibleCount(current);

            if (current >= lines.length) {
                clearInterval(timer);
            }
        }, 650);

        return () => clearInterval(timer);
    }, []);

    return (
        <Section>
            <Container>

                <Card>

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500" />
                            <span className="h-3 w-3 rounded-full bg-yellow-500" />
                            <span className="h-3 w-3 rounded-full bg-green-500" />
                        </div>

                        <div className="flex items-center gap-3">

                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                                LIVE
                            </span>

                            <span className="font-mono text-sm text-zinc-500">
                                ~/codertushar.in
                            </span>

                        </div>

                    </div>

                    {/* Body */}
                    <div className="h-[320px] overflow-hidden p-8">

                        <div className="space-y-3 font-mono text-sm leading-7">

                            {lines.map((line, index) => (

                                <motion.p
                                    key={line}
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: index < visibleCount ? 1 : 0,
                                        y: index < visibleCount ? 0 : 8,
                                    }}
                                    transition={{
                                        duration: 0.35,
                                    }}
                                    className={
                                        line.startsWith("$") || line.startsWith("✓")
                                            ? "text-emerald-400"
                                            : "text-zinc-400"
                                    }
                                >
                                    {index < visibleCount ? line : "\u00A0"}
                                </motion.p>

                            ))}

                            <motion.div
                                animate={{
                                    opacity: [1, 0, 1],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="mt-2 h-5 w-2 rounded-sm bg-emerald-400"
                            />

                        </div>

                    </div>

                </Card>

            </Container>
        </Section>
    );
}