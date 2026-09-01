"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Skills from "@/src/components/sections/Skills";
import Projects from "@/src/components/sections/Projects";
import Experience from "@/src/components/sections/Experience";
import CaseStudy from "@/src/components/sections/CaseStudy";
import Contact from "@/src/components/sections/Contact";
import Footer from "@/src/components/sections/Footer";
import Floating3DControls from "@/src/components/ui/Floating3DControls";

// Lazy-load Global WebGL Three.js Scene
const Global3DCanvas = dynamic(
  () => import("@/src/components/canvas/Global3DCanvas"),
  { ssr: false }
);

// Smooth scrolling utility
const smoothScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize Bootstrap components & scroll listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      } catch (e) {}

      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]');

        if (anchor) {
          e.preventDefault();
          const href = anchor.getAttribute("href");
          if (href && href !== "#") {
            const id = href.replace("#", "");
            smoothScrollTo(id);
          }
        }
      };

      const handleScroll = () => {
        const total =
          document.documentElement.scrollHeight - window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, window.pageYOffset / total));
        setScrollProgress(progress);

        if (window.pageYOffset > 320) {
          setShowBackToTop(true);
        } else {
          setShowBackToTop(false);
        }
      };

      document.addEventListener("click", handleAnchorClick);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <main className="position-relative min-vh-100" style={{ background: "#090e17" }}>
      {/* Global 3D WebGL Background Scene */}
      <Global3DCanvas
        particleSpeed={particleSpeed}
        wireframeMode={wireframeMode}
      />

      {/* Dynamic Glowing Cyber Scroll Progress Bar */}
      <div
        className="position-fixed top-0 start-0 end-0 z-3"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: "0%",
          height: "3.5px",
          background: "linear-gradient(90deg, #006b7d, #00a896, #00e5ff)",
          boxShadow: "0 0 14px rgba(0, 229, 255, 0.7)",
          transition: "transform 0.08s ease-out",
        }}
      />

      {/* Floating 3D Scene Controls HUD */}
      <Floating3DControls
        particleSpeed={particleSpeed}
        setParticleSpeed={setParticleSpeed}
        wireframeMode={wireframeMode}
        setWireframeMode={setWireframeMode}
      />

      {/* Floating Animated Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="btn btn-primary rounded-circle shadow-lg position-fixed bottom-0 end-0 m-3 m-md-4 z-3 d-flex align-items-center justify-content-center border border-info border-opacity-40"
            style={{
              width: "48px",
              height: "48px",
              fontSize: "1.2rem",
              background: "linear-gradient(135deg, #006b7d, #00e5ff)",
              boxShadow: "0 0 20px rgba(0, 229, 255, 0.4)",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.15, boxShadow: "0 0 30px rgba(0, 229, 255, 0.7)" }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section with Interactive 3D Cyber Core */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section with 3D Stat Cubes */}
      <section id="about-section" className="position-relative">
        <div className="container-divider"></div>
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="position-relative">
        <div className="container-divider"></div>
        <Skills />
      </section>

      {/* Experience Section with 3D Timeline */}
      <section id="experience-section" className="position-relative">
        <div className="container-divider"></div>
        <Experience />
      </section>

      {/* Featured Case Study Section */}
      <section id="case-study-section" className="position-relative">
        <div className="container-divider"></div>
        <CaseStudy />
      </section>

      {/* Projects Section with 3D Tilt Cards */}
      <section id="projects-section" className="position-relative">
        <div className="container-divider"></div>
        <Projects />
      </section>

      {/* Contact Section with 3D Terminal */}
      <section id="contact-section" className="position-relative">
        <div className="container-divider"></div>
        <Contact />
      </section>

      {/* Footer */}
      <section id="footer-section" className="position-relative">
        <div className="container-divider"></div>
        <Footer />
      </section>
    </main>
  );
}