import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer",
    short_name: "Mutti Portfolio",
    description:
      "Business Analyst & Full-Stack Developer specializing in enterprise SaaS onboarding, implementation, Django, React, and Next.js.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#006b7d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
