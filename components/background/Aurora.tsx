"use client";

import { motion } from "framer-motion";

export default function Aurora() {
  return (
    <>
      <motion.div
        animate={{
          x: [0, 80, -60, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[-180px] h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -80, 50, 0],
          y: [0, 50, -40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-120px] bottom-[-120px] h-[420px] w-[420px] rounded-full bg-violet-500/10 blur-[140px]"
      />
    </>
  );
}