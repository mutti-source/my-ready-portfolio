"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaGithub,
  FaLinkedin,
  FaFileDownload,
  FaEnvelope,
  FaWhatsapp,
  FaLayerGroup,
  FaCode,
  FaCogs,
} from "react-icons/fa";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { personalInfo } from "@/src/data/personalInfo";
import { socialLinks } from "@/src/data/socialLinks";

// Lazy-load Three.js 3D Core
const HeroCyberCore3D = dynamic(
  () => import("@/src/components/canvas/HeroCyberCore3D"),
  { ssr: false }
);

const Hero = () => {
  return (
    <motion.section
      id="hero"
      className="d-flex align-items-center min-vh-100 py-5 position-relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center justify-content-between gy-4 gy-lg-0">
          {/* Left Column: Bio & Calls to Action */}
          <Col xs={12} lg={7} xl={6} className="text-center text-lg-start">
            <motion.div variants={childVariants}>
              {/* Available Status Pill */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3 card-glass-3d border border-info border-opacity-30">
                <span className="status-pulse-dot" />
                <span className="small fw-semibold text-info">
                  Available for SaaS & Full-Stack Roles
                </span>
              </div>

              <h1 className="fw-bold display-5 display-md-4 mb-2 text-break">
                Hi, I'm <span className="gradient-text-cyber">{personalInfo.name}</span>
              </h1>

              <h2 className="fs-4 fs-md-3 fw-semibold text-light mb-3 opacity-90">
                {personalInfo.title}
              </h2>

              <p
                className="lead fs-6 text-muted mb-4 mx-auto mx-lg-0 lh-lg"
                style={{ maxWidth: "620px" }}
              >
                {personalInfo.intro}
              </p>

              {/* Specialization Tags */}
              <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start mb-4">
                <span className="badge card-glass-3d text-info py-2 px-3 fw-normal d-flex align-items-center gap-1.5">
                  <FaLayerGroup /> Enterprise SaaS Onboarding
                </span>
                <span className="badge card-glass-3d text-light py-2 px-3 fw-normal d-flex align-items-center gap-1.5">
                  <FaCode className="text-info" /> Django & React Architecture
                </span>
                <span className="badge card-glass-3d text-light py-2 px-3 fw-normal d-flex align-items-center gap-1.5">
                  <FaCogs className="text-info" /> UAT & Workflow Logic
                </span>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center justify-content-lg-start align-items-center gap-3">
                <Button
                  href={personalInfo.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="btn-primary-custom d-inline-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                >
                  <FaFileDownload />
                  View Resume
                </Button>
                <Button
                  href="#contact-section"
                  size="lg"
                  className="btn-outline-cyber d-inline-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                >
                  Contact Me
                </Button>
                <div className="d-flex align-items-center justify-content-center gap-3 mt-2 mt-sm-0 ms-sm-2">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted fs-4 p-2"
                      aria-label={link.title}
                      whileHover={{ scale: 1.25, color: "#00e5ff" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {link.title === "Github" && <FaGithub />}
                      {link.title === "LinkedIn" && <FaLinkedin />}
                      {link.title === "Email" && <FaEnvelope />}
                      {link.title === "WhatsApp" && <FaWhatsapp />}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Right Column: Interactive 3D Cyber Core */}
          <Col xs={12} lg={5} xl={6}>
            <motion.div
              variants={childVariants}
              className="position-relative d-flex justify-content-center"
            >
              <HeroCyberCore3D />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Hero;
