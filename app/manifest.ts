import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Developer Portfolio",
    short_name: "Portfolio",
    description: "A modern developer portfolio built with Next.js and Tailwind CSS.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b121b",
    theme_color: "#f47423",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
