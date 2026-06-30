import Aurora from "./Aurora";
import MouseGlow from "./MouseGlow";

export default function Background() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            {/* Base Background */}
            <div className="absolute inset-0 bg-[#030712]" />

            {/* Animated Aurora */}
            <Aurora />

            <MouseGlow />

            {/* Top Blue Glow */}
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[140px]" />

            {/* Left Purple Glow */}
            <div className="absolute left-[-120px] top-1/3 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[120px]" />

            {/* Right Cyan Glow */}
            <div className="absolute right-[-120px] bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-400/10 blur-[120px]" />

            {/* Developer Grid */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
          `,
                    backgroundSize: "48px 48px",
                }}
            />

            {/* Radial Fade Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_0%,#030712_75%)]" />
        </div>
    );
}