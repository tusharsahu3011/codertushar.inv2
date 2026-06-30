import os from "node:os";
import fs from "node:fs";
import path from "node:path";

const interfaces = os.networkInterfaces();

let ip = "localhost";

for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name] || []) {
        if (
            net.family === "IPv4" &&
            !net.internal &&
            (net.address.startsWith("10.") ||
                net.address.startsWith("192.168.") ||
                net.address.startsWith("172."))
        ) {
            ip = net.address;
            break;
        }
    }
}

const config = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["${ip}"],
};

export default nextConfig;
`;

fs.writeFileSync(
    path.join(process.cwd(), "next.config.ts"),
    config
);

console.log("✅ Updated allowedDevOrigins:", ip);