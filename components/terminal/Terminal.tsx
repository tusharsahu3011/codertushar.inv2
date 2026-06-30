"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

const terminalLines = [
    {
        text: "$ npm run dev",
        color: "text-emerald-400",
    },
    {
        text: "▲ Next.js 16",
        color: "text-blue-400",
    },
    {
        text: "",
        color: "",
    },
    {
        text: "Creating an amazing developer experience...",
        color: "text-zinc-400",
    },
    {
        text: "Building UI components...",
        color: "text-zinc-400",
    },
    {
        text: "Optimizing performance...",
        color: "text-zinc-400",
    },
    {
        text: "Launching codertushar.in...",
        color: "text-zinc-400",
    },
    {
        text: "",
        color: "",
    },
    {
        text: "✓ Ready in 1.2s",
        color: "text-emerald-400",
    },
];

export default function Terminal() {
    const [visibleIndex, setVisibleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setVisibleIndex((prev) => {
                if (prev >= terminalLines.length) {
                    clearInterval(interval);
                    return prev;
                }

                return prev + 1;
            });
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <Section>
            <Container>

                <Card className="overflow-hidden">

                    {/* Header */}
                    <div className="flex h-14 items-center justify-between border-b border-white/10 px-6">

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
                    <div className="bg-[#050816] px-8 py-8">

                        <div className="min-h-[340px]">

                            <div className="space-y-2 font-mono text-[15px] leading-7">
                                {terminalLines.map((line, index) => {

                                    const visible = index < visibleIndex;
                                    const current = index === visibleIndex - 1;

                                    return (

                                        <motion.div
                                            key={index}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                            }}
                                            animate={{
                                                opacity: visible ? 1 : 0,
                                                y: visible ? 0 : 8,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                            }}
                                            className="min-h-7"
                                        >

                                            {line.text === "" ? (
                                                <span>&nbsp;</span>
                                            ) : (
                                                <span
                                                    className={`${line.color} inline-flex items-center`}
                                                >
                                                    {visible && line.text}

                                                    {current && (
                                                        <motion.span
                                                            animate={{
                                                                opacity: [1, 0, 1],
                                                            }}
                                                            transition={{
                                                                duration: 1,
                                                                repeat: Infinity,
                                                                ease: "linear",
                                                            }}
                                                            className="ml-1 inline-block h-5 w-[2px] rounded-full bg-emerald-400"
                                                        />
                                                    )}
                                                </span>
                                            )}

                                        </motion.div>

                                    );

                                })}

                            </div>

                        </div>

                    </div>

                </Card>

            </Container>
        </Section>
    );
}