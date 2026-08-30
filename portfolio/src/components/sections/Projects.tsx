"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { projects } from "@/src/data/projects";
import { FaGithub } from "react-icons/fa";
import {
  staggerContainer,
  staggerFast,
  fadeInUp,
  tagPop,
} from "@/src/components/AnimationVariants";
import SectionHeading from "@/src/components/SectionHeading";

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Featured Projects"
          subtitle="Production-ready full-stack applications and real-time architectures."
        />

        <Row className="g-3 g-md-4">
          {projects.map((project, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <motion.div
                variants={fadeInUp}
                className="h-100"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
                  <div
                    className="position-absolute top-0 start-0 w-100"
                    style={{
                      height: "3px",
                      background: "linear-gradient(90deg, #006b7d, #00e5ff)",
                    }}
                  />
                  <Card.Body className="d-flex flex-column p-3 p-md-4">
                    <div className="mb-3">
                      <Card.Title className="fw-semibold mb-2 fs-5">
                        {project.title}
                      </Card.Title>

                      <Card.Text className="text-muted small">
                        {project.description}
                      </Card.Text>
                    </div>

                    <ul className="ps-3 text-muted mb-3 small">
                      {project.features.map((feature, i) => (
                        <li key={i} className="mb-1">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Animated Tech Badges */}
                    <motion.div
                      className="mb-4 d-flex flex-wrap gap-1.5 gap-md-2"
                      variants={staggerFast}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {project.tech.map((t, i) => (
                        <motion.span
                          key={i}
                          className="badge bg-body-secondary text-body border fw-normal"
                          variants={tagPop}
                          whileHover={{ scale: 1.08 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </motion.div>

                    <div className="mt-auto d-flex flex-wrap gap-2">
                      <Button
                        href={project.github}
                        target="_blank"
                        variant="outline-secondary"
                        size="sm"
                        className="d-inline-flex align-items-center gap-2"
                      >
                        <FaGithub />
                        GitHub
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default Projects;