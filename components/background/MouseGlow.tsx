"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function MouseGlow() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const x = useSpring(mouseX, {
        stiffness: 120,
        damping: 20,
    });

    const y = useSpring(mouseY, {
        stiffness: 120,
        damping: 20,
    });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mouseX.set(event.clientX - 200);
            mouseY.set(event.clientY - 200);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            style={{
                x,
                y,
            }}
            className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]"
        />
    );
}