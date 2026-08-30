"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Hero from "@/src/components/sections/Hero";
import About from "@/src/components/sections/About";
import Skills from "@/src/components/sections/Skills";
import Projects from "@/src/components/sections/Projects";
import Experience from "@/src/components/sections/Experience";
import CaseStudy from "@/src/components/sections/CaseStudy";
import Contact from "@/src/components/sections/Contact";
import Footer from "../components/sections/Footer";

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

  // Framer Motion smooth spring scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize Bootstrap components & scroll listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");

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
    <main className="position-relative">
      {/* Dynamic Glowing Scroll Progress Bar */}
      <motion.div
        className="position-fixed top-0 start-0 end-0 z-3"
        style={{
          scaleX,
          transformOrigin: "0%",
          height: "3.5px",
          background: "linear-gradient(90deg, #006b7d, #00a896, #00e5ff)",
          boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
        }}
      />

      {/* Floating Animated Back-to-Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="btn btn-primary rounded-circle shadow-lg position-fixed bottom-0 end-0 m-3 m-md-4 z-3 d-flex align-items-center justify-content-center"
            style={{ width: "46px", height: "46px", fontSize: "1.2rem" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.12, boxShadow: "0 8px 25px rgba(0, 107, 125, 0.4)" }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about-section" className="position-relative">
        <div className="container-divider"></div>
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="position-relative">
        <div className="container-divider"></div>
        <Skills />
      </section>

      {/* Experience Section */}
      <section id="experience-section" className="position-relative">
        <div className="container-divider"></div>
        <Experience />
      </section>

      {/* Featured Case Study Section */}
      <section id="case-study-section" className="position-relative">
        <div className="container-divider"></div>
        <CaseStudy />
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="position-relative">
        <div className="container-divider"></div>
        <Projects />
      </section>

      {/* Contact Section */}
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