"use client";

import CodeWindow from "./hero-visual/CodeWindow";
import StatusBadge from "./hero-visual/StatusBadge";
import TerminalWindow from "./hero-visual/TerminalWindow";

export default function HeroVisual() {
    return (
        <div
            aria-hidden="true"
            className="relative h-[600px] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
        >

            {/* Glass Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_20%,transparent_40%)]" />

            {/* Background Glow */}
            <div className="absolute left-1/2 top-20 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

            {/* Inner Border */}
            <div className="absolute inset-4 rounded-2xl border border-white/10">

                <CodeWindow />

                <TerminalWindow />

                {/* Status Badges */}
                <StatusBadge
                    label="Building"
                    color="emerald"
                    className="right-8 top-10"
                />

                <StatusBadge
                    label="Next.js 15"
                    color="blue"
                    className="bottom-32 left-8"
                />

            </div>

        </div>
    );
}