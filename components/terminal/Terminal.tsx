"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";

// Each line: what it says, and what color it
// renders in. Empty text = a blank spacer line
// (no typing, just a short pause).
const terminalLines: { text: string; color: string }[] = [
    {
        text: "$ npm run dev",
        color: "text-emerald-400",
    },
    {
        text: "",
        color: "",
    },
    {
        text: "> codertushar.in@0.1.0 dev",
        color: "text-zinc-500",
    },
    {
        text: "> next dev",
        color: "text-zinc-500",
    },
    {
        text: "",
        color: "",
    },
    {
        text: "   ▲ Next.js 16.0.1",
        color: "text-cyan-400",
    },
    {
        text: "   - Local:   http://localhost:3000",
        color: "text-zinc-400",
    },
    {
        text: "",
        color: "",
    },
    {
        text: " ✓ Ready in 890ms",
        color: "text-emerald-400",
    },
    {
        text: "",
        color: "",
    },
    {
        text: "$ git push origin main",
        color: "text-blue-400",
    },
    {
        text: " ✓ Deployed to codertushar.in 🚀",
        color: "text-emerald-400",
    },
];

const START_DELAY_MS = 300;
const TYPE_SPEED_MS = 22;
const LINE_PAUSE_MS = 260;
const BLANK_LINE_PAUSE_MS = 180;

function TerminalCursor() {
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
            className="ml-1 inline-block h-5 w-[2px] rounded-full bg-emerald-400 align-middle"
        />
    );
}

export default function Terminal() {
    const containerRef = useRef<HTMLDivElement | null>(null);

    // once: true -> the animation is only ever
    // armed the first time the terminal scrolls
    // into view; scrolling away and back won't
    // retrigger it.
    const isInView = useInView(containerRef, {
        once: true,
        amount: 0.4,
    });

    const hasStarted = useRef(false);

    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {

        if (!isInView || hasStarted.current) {
            return;
        }

        hasStarted.current = true;

        let cancelled = false;
        let currentLine = 0;
        let currentChar = 0;
        let timeoutId: ReturnType<typeof setTimeout>;

        function typeNextChar() {

            if (cancelled) {
                return;
            }

            if (currentLine >= terminalLines.length) {
                setIsDone(true);
                return;
            }

            const line = terminalLines[currentLine];

            if (line.text === "") {

                currentLine += 1;
                currentChar = 0;

                setLineIndex(currentLine);
                setCharIndex(0);

                timeoutId = setTimeout(
                    typeNextChar,
                    BLANK_LINE_PAUSE_MS
                );

                return;

            }

            if (currentChar < line.text.length) {

                currentChar += 1;
                setCharIndex(currentChar);

                timeoutId = setTimeout(
                    typeNextChar,
                    TYPE_SPEED_MS
                );

            } else {

                currentLine += 1;
                currentChar = 0;

                setLineIndex(currentLine);
                setCharIndex(0);

                timeoutId = setTimeout(
                    typeNextChar,
                    LINE_PAUSE_MS
                );

            }

        }

        timeoutId = setTimeout(
            typeNextChar,
            START_DELAY_MS
        );

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };

    }, [isInView]);

    return (
        <Section>
            <Container>

                <div ref={containerRef}>

                    <Card className="overflow-hidden transition-all duration-300 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10">

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

                            <div className="min-h-[300px]">

                                <div className="space-y-2 font-mono text-[15px] leading-7">
                                    {terminalLines.map((line, index) => {

                                        const isFullyTyped = index < lineIndex;
                                        const isCurrentlyTyping = index === lineIndex && !isDone;
                                        const isVisible = isFullyTyped || isCurrentlyTyping;

                                        if (!isVisible) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="min-h-7"
                                                />
                                            );
                                        }

                                        const displayText = isFullyTyped
                                            ? line.text
                                            : line.text.slice(0, charIndex);

                                        return (

                                            <motion.div
                                                key={index}
                                                initial={{
                                                    opacity: 0,
                                                    y: 8,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                transition={{
                                                    duration: 0.25,
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
                                                        {displayText}

                                                        {isCurrentlyTyping && (
                                                            <TerminalCursor />
                                                        )}
                                                    </span>
                                                )}

                                            </motion.div>

                                        );

                                    })}

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                        }}
                                        animate={{
                                            opacity: isDone ? 1 : 0,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay: isDone ? 0.2 : 0,
                                        }}
                                        className="flex min-h-7 items-center"
                                    >
                                        {isDone && (
                                            <>
                                                <span className="text-emerald-400">
                                                    $
                                                </span>

                                                <TerminalCursor />
                                            </>
                                        )}
                                    </motion.div>

                                </div>

                            </div>

                        </div>

                    </Card>

                </div>

            </Container>
        </Section>
    );
}
