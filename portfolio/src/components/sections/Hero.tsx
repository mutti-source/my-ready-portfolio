"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope, FaPhone } from "react-icons/fa";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { personalInfo } from "@/src/data/personalInfo";
import { socialLinks } from "@/src/data/socialLinks";

const Hero = () => {


  return (
    <motion.section
      id="hero"
      className="d-flex align-items-center min-vh-100"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8}>
            <motion.div variants={childVariants} className="h-100">

              <h1 className="fw-bold display-5 mb-3">
                {personalInfo.name}
              </h1>


              <h2 className="fs-4 fw-medium text-muted mb-4">
                {personalInfo.title}
              </h2>

              <p className="lead text-muted mb-5">
                {personalInfo.intro}
              </p>


              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                <Button
                  href="#projects"
                  variant="dark"
                  size="lg"
                >
                  View Projects
                </Button>

                {/* <Button
                  href={personalInfo.resumeLink}
                  variant="outline-primary"
                  size="lg"
                  className="d-flex align-items-center gap-2"
                >
                  <FaFileDownload />
                  Download Resume
                </Button> */}

                <a className="d-flex align-items-center gap-3 ms-lg-3" href="/blogs">
                  Read My Blogs
                </a>
                <div className="d-flex align-items-center gap-3 ms-lg-3">

                  {socialLinks.map((link) => (
                    <a key={link.title} href={link.link} target="_blank" rel="noopener noreferrer" className="text-muted fs-4">
                      {link.title === "Github" && <FaGithub />}
                      {link.title === "LinkedIn" && <FaLinkedin />}
                      {link.title === "Email" && <FaEnvelope />}

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
