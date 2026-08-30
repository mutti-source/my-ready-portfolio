"use client";

import { useEffect } from "react";
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
    const offset = 80; // Adjust for fixed header if needed
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

export default function Home() {
  // Initialize Bootstrap components and smooth scrolling
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
      
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]');
        
        if (anchor) {
          e.preventDefault();
          const href = anchor.getAttribute('href');
          if (href && href !== '#') {
            const id = href.replace('#', '');
            smoothScrollTo(id);
          }
        }
      };

      document.addEventListener('click', handleAnchorClick);
      
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    }
  }, []);

  return (
    <main className="position-relative ">
      <div className="position-fixed top-0 start-0 w-100 z-3 " style={{ height: "3px" }}>
        <div 
          className="bg-primary h-100"
          style={{ 
            width: "0%",
            transition: "width 0.3s ease",
          }}
          id="scroll-progress"
        />
      </div>

      <button
        className="btn btn-primary rounded-circle shadow-lg position-fixed bottom-0 end-0 m-3 m-md-4 z-3 d-none d-flex align-items-center justify-content-center"
        style={{ width: "44px", height: "44px", fontSize: "1.2rem" }}
        id="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

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

      

      {/* Progress Indicator Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('scroll', function() {
            const progress = document.getElementById('scroll-progress');
            const backToTop = document.getElementById('back-to-top');
            
            if (progress) {
              const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
              const scrolled = (window.pageYOffset / windowHeight) * 100;
              progress.style.width = scrolled + '%';
            }
            
            if (backToTop) {
              if (window.pageYOffset > 300) {
                backToTop.classList.remove('d-none');
              } else {
                backToTop.classList.add('d-none');
              }
            }
          });
          
          // Trigger initial check
          window.dispatchEvent(new Event('scroll'));
        `
      }} />
    </main>
  );
}