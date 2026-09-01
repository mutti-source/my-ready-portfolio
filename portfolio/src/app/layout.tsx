import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer — Islamabad, Pakistan",
  description:
    "Business Analyst and Full-Stack Developer based in Islamabad, Pakistan. 3+ years leading SaaS onboarding, implementation, and requirements gathering for U.S. enterprise clients, with hands-on experience in Django, React, and React Native.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://my-ready-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer",
    description:
      "Business Analyst and Full-Stack Developer based in Islamabad, Pakistan. 3+ years leading SaaS onboarding, implementation, and requirements gathering for U.S. enterprise clients.",
    type: "website",
    url: "https://my-ready-portfolio.vercel.app/",
    siteName: "Mutti Ullah Qureshi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer",
    description:
      "Business Analyst and Full-Stack Developer based in Islamabad, Pakistan. 3+ years leading SaaS onboarding, implementation, and requirements gathering for U.S. enterprise clients.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://my-ready-portfolio.vercel.app/#person",
        name: "Mutti Ullah Qureshi",
        jobTitle: "Business Analyst & Full-Stack Developer",
        description:
          "Business Analyst & Full-Stack Developer with 3+ years leading enterprise SaaS onboarding and full-stack development using Django, React, and Next.js.",
        url: "https://my-ready-portfolio.vercel.app",
        worksFor: {
          "@type": "Organization",
          name: "PlanStreet Inc.",
          url: "https://planstreetinc.com",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
        sameAs: [
          "https://www.linkedin.com/in/mutti-qureshi/",
          "https://github.com/mutti-dev",
        ],
        knowsAbout: [
          "Business Analysis",
          "Enterprise SaaS Onboarding",
          "Requirements Gathering",
          "User Acceptance Testing (UAT)",
          "Django",
          "React.js",
          "Next.js",
          "React Native",
          "Python",
          "TypeScript",
          "REST APIs",
          "WebSockets",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://my-ready-portfolio.vercel.app/#website",
        url: "https://my-ready-portfolio.vercel.app",
        name: "Mutti Ullah Qureshi Portfolio",
        description: "Official portfolio of Mutti Ullah Qureshi, Business Analyst & Full-Stack Developer",
        publisher: {
          "@id": "https://my-ready-portfolio.vercel.app/#person",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://my-ready-portfolio.vercel.app/#profilepage",
        url: "https://my-ready-portfolio.vercel.app",
        name: "Mutti Ullah Qureshi — Business Analyst & Full-Stack Developer",
        mainEntity: {
          "@id": "https://my-ready-portfolio.vercel.app/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" data-bs-theme="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
