"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { personalInfo } from "@/src/data/personalInfo";
import { socialLinks } from "@/src/data/socialLinks";

// Lazy-load Three.js canvas on client side without blocking initial page render
const Hero3DBackground = dynamic(
  () => import("@/src/components/canvas/Hero3DBackground"),
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
      <Hero3DBackground />

      <Container className="position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center text-center">
          <Col xs={12} sm={11} md={10} lg={9} xl={8}>
            <motion.div variants={childVariants} className="h-100 py-3">

              <h1 className="fw-bold display-6 display-sm-5 display-md-4 mb-3 text-break">
                {personalInfo.name}
              </h1>

              <h2 className="fs-5 fs-md-4 fw-medium text-muted mb-3 mb-md-4">
                {personalInfo.title}
              </h2>

              <p className="lead fs-6 fs-md-5 text-muted mb-4 mb-md-5 mx-auto" style={{ maxWidth: "720px" }}>
                {personalInfo.intro}
              </p>

              <div className="d-flex flex-column flex-sm-row flex-wrap justify-content-center align-items-center gap-3">
                <Button
                  href={personalInfo.resumeLink}
                  variant="dark"
                  size="lg"
                  className="d-inline-flex align-items-center justify-content-center gap-2 btn-primary-custom w-100 w-sm-auto"
                >
                  <FaFileDownload />
                  View Resume
                </Button>
                <Button
                  href="#contact-section"
                  variant="outline-primary"
                  size="lg"
                  className="d-inline-flex align-items-center justify-content-center gap-2 btn-primary-custom w-100 w-sm-auto"
                >
                  Contact Me
                </Button>
                <div className="d-flex align-items-center justify-content-center gap-3 mt-2 mt-sm-0 ms-sm-2 ms-lg-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted fs-4 p-2"
                      aria-label={link.title}
                    >
                      {link.title === "Github" && <FaGithub />}
                      {link.title === "LinkedIn" && <FaLinkedin />}
                      {link.title === "Email" && <FaEnvelope />}
                      {link.title === "WhatsApp" && <FaWhatsapp />}
                    </a>
                  ))}
                </div>
              </div>

            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Hero;
