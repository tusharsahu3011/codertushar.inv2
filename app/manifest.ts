import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Coder Tushar",
        short_name: "CoderTushar",
        description:
            "A premium destination for programmers to learn through roadmaps, notes, projects, tutorials and practical resources.",

        start_url: "/",
        display: "standalone",
        background_color: "#030712",
        theme_color: "#030712",

        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
    };
}
