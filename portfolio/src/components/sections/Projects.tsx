"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Button } from "react-bootstrap";
import { projects } from "@/src/data/projects";
import { FaGithub, FaExternalLinkAlt, FaLayerGroup } from "react-icons/fa";
import {
  staggerContainer,
  staggerFast,
  fadeInUp,
  tagPop,
} from "@/src/components/AnimationVariants";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Featured Production Projects"
          subtitle="Production-ready full-stack applications, real-time architectures, and SaaS solutions."
        />

        <Row className="g-4">
          {projects.map((project, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <motion.div variants={fadeInUp} className="h-100">
                <Card3D
                  maxTilt={14}
                  glowColor="rgba(0, 229, 255, 0.3)"
                  className="p-4 d-flex flex-column h-100"
                >
                  <div
                    className="position-absolute top-0 start-0 w-100"
                    style={{
                      height: "3px",
                      background: "linear-gradient(90deg, #00e5ff, #00a896)",
                    }}
                  />
                  <div className="hologram-scanline" />

                  {/* 3D Header Area */}
                  <div
                    className="mb-3"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <h3 className="fw-bold text-light mb-2 fs-5 d-flex align-items-center justify-content-between">
                      <span>{project.title}</span>
                      <span className="badge bg-body-secondary text-info border border-info border-opacity-25 small">
                        Project #{index + 1}
                      </span>
                    </h3>

                    <p className="text-muted small mb-0 lh-base">
                      {project.description}
                    </p>
                  </div>

                  {/* Feature Highlights */}
                  <ul
                    className="ps-3 text-muted mb-3 small"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {project.features.map((feature, i) => (
                      <li key={i} className="mb-1.5">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Animated Tech Badges */}
                  <motion.div
                    className="mb-4 d-flex flex-wrap gap-1.5"
                    variants={staggerFast}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {project.tech.map((t, i) => (
                      <motion.span
                        key={i}
                        className="badge bg-body-secondary text-info border border-info border-opacity-20 fw-normal"
                        variants={tagPop}
                        whileHover={{ scale: 1.08 }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Action Buttons in 3D */}
                  <div
                    className="mt-auto d-flex flex-wrap gap-2 pt-2 border-top border-secondary border-opacity-25"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    <Button
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="sm"
                      className="btn-outline-cyber d-inline-flex align-items-center gap-2 py-1.5 px-3"
                    >
                      <FaGithub />
                      GitHub Repository
                    </Button>
                  </div>
                </Card3D>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default Projects;