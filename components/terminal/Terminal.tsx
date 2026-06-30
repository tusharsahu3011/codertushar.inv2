"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

export default function Terminal() {
    const lines = [
        "$ npm run dev",
        "▲ Next.js 15",
        "Creating an amazing developer experience...",
        "Building UI components...",
        "Optimizing performance...",
        "Launching codertushar.in...",
        "✓ Ready in 1.2s",
    ];

    const [visibleLines, setVisibleLines] = useState<string[]>([]);

    useEffect(() => {
        let index = 0;

        const interval = setInterval(() => {
            setVisibleLines(lines.slice(0, index + 1));

            index++;

            if (index >= lines.length) {
                clearInterval(interval);
            }
        }, 700);

        return () => clearInterval(interval);
    }, []);
    return (
        <Section>
            <Container>

                <Card>

                    {/* Terminal Header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">

                        <div className="flex items-center gap-2">
                            <span className="h-3 w-3 rounded-full bg-red-500"></span>
                            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                            <span className="h-3 w-3 rounded-full bg-green-500"></span>
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

                    {/* Terminal Body */}
                    <div className="space-y-3 p-8 font-mono text-sm leading-7">

                        {visibleLines.map((line, index) => (
                            <p
                                key={index}
                                className={
                                    line.startsWith("$") || line.startsWith("✓")
                                        ? "text-emerald-400"
                                        : "text-zinc-400"
                                }
                            >
                                {line}
                            </p>
                        ))}

                        <motion.div
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="inline-block h-5 w-2 rounded-sm bg-emerald-400"
                        />

                    </div>

                </Card>

            </Container>
        </Section>
    );
}