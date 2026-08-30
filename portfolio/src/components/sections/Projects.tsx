"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { projects } from "@/src/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";


const Projects = () => {

 

  return (
    <motion.section
      id="projects"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <h2 className="text-center fw-semibold display-6 mb-4 mb-md-5">
          Projects
        </h2>

        <Row className="g-3 g-md-4">
          {projects.map((project, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <motion.div variants={childVariants} className="h-100">
                <Card className="h-100 shadow-sm border-0">
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

                    <div className="mb-4 d-flex flex-wrap gap-1.5 gap-md-2">
                      {project.tech.map((t, i) => (
                        <motion.span
                          key={i}
                          className="badge bg-body-secondary text-body border fw-normal"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {t}
                        </motion.span>
                      ))}
                    </div>

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