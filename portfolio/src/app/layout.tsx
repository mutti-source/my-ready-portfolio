import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import ThemeInit from "@/src/components/ThemeInit";
import Script from "next/script";

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
  keywords: [
    "Business Analyst Islamabad",
    "Business Analyst Pakistan",
    "Implementation Specialist Pakistan",
    "SaaS Onboarding Specialist",
    "Full Stack Developer Islamabad",
    "Full Stack Developer Pakistan",
    "Technical Business Analyst",
    "Application Support Analyst Pakistan",
    "Django React Developer Pakistan",
    "Enterprise SaaS Implementation Consultant",
    "Mutti Ullah Qureshi",
    "Mutti Qureshi"
  ],
  authors: [{ name: "Mutti Ullah Qureshi", url: "https://my-ready-portfolio.vercel.app" }],
  creator: "Mutti Ullah Qureshi",
  publisher: "Mutti Ullah Qureshi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://my-ready-portfolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer",
    description:
      "Business Analyst and Full-Stack Developer based in Islamabad, Pakistan. 3+ years leading SaaS onboarding, implementation, and requirements gathering for U.S. enterprise clients, with hands-on experience in Django, React, and React Native.",
    type: "website",
    url: "https://my-ready-portfolio.vercel.app/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mutti Ullah Qureshi - Business Analyst & Full-Stack Developer",
      },
    ],
    locale: "en_US",
    siteName: "Mutti Ullah Qureshi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mutti Ullah Qureshi | Business Analyst & Full-Stack Developer",
    description:
      "Business Analyst and Full-Stack Developer based in Islamabad, Pakistan. 3+ years leading SaaS onboarding, implementation, and requirements gathering for U.S. enterprise clients, with hands-on experience in Django, React, and React Native.",
    images: ["/og-image.jpg"],
    creator: "@mutti_qureshi",
  },
  category: "technology",
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
    <html lang="en" data-bs-theme="light" suppressHydrationWarning>
      <head>
        <script
          key="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        {/* ✅ Google Analytics - LOAD SCRIPT */}
        <Script
          key="ga-script-src"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script key="ga-script-inline" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
        </Script>

        <script
          key="theme-script"
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                try {
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  document.documentElement.setAttribute(
                    'data-bs-theme',
                    prefersDark ? 'dark' : 'light'
                  );
                } catch (e) {}
              })();
            `,
          }}
        />



      </head>

      <body className={inter.className}>
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
