"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  staggerContainer,
  staggerFast,
  fadeInUp,
  tagPop,
} from "@/src/components/AnimationVariants";
import { skills } from "@/src/data/skills";
import SectionHeading from "@/src/components/SectionHeading";

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Skills & Expertise"
          subtitle="A blend of business analysis methodologies, implementation leadership, and full-stack software development."
        />

        <Row className="g-3 g-md-4 justify-content-center">
          {skills.map((group, index) => (
            <Col key={index} xs={12} sm={10} md={6} lg={4}>
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
                      background: "linear-gradient(90deg, #006b7d, #00a896)",
                    }}
                  />
                  <Card.Body className="p-3 p-md-4">
                    <Card.Title className="fw-semibold mb-3 fs-5 d-flex align-items-center justify-content-between">
                      <span>{group.title}</span>
                      <span className="badge bg-body-secondary text-primary border small">
                        {group.skills.length}
                      </span>
                    </Card.Title>

                    {/* Staggered Tag Pop-in */}
                    <motion.div
                      className="d-flex flex-wrap gap-2"
                      variants={staggerFast}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {group.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="badge bg-secondary text-light px-2.5 px-md-3 py-2 fw-normal"
                          variants={tagPop}
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "#006b7d",
                            boxShadow: "0px 4px 12px rgba(0, 107, 125, 0.35)",
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ cursor: "default" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
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

export default Skills;
