"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
};

export default function Reveal({ children }: RevealProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 32,
                filter: "blur(8px)",
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
            }}
            viewport={{
                once: true,
                amount: 0.2,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}