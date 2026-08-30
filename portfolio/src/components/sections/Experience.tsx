"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/src/components/AnimationVariants";
import { experiences } from "@/src/data/experiences";
import SectionHeading from "@/src/components/SectionHeading";

const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Professional Experience"
          subtitle="Proven track record in enterprise SaaS onboarding and full-stack software development."
        />

        <Row className="g-3 g-md-4">
          {experiences.map((exp, index) => {
            const cardVariant = index % 2 === 0 ? slideInLeft : slideInRight;

            return (
              <Col key={index} xs={12} md={6}>
                <motion.div
                  variants={cardVariant}
                  className="h-100"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <Card className="h-100 shadow-sm border-0 position-relative overflow-hidden">
                    <div
                      className="position-absolute top-0 start-0 w-100"
                      style={{
                        height: "3px",
                        background:
                          index === 0
                            ? "linear-gradient(90deg, #006b7d, #00e5ff)"
                            : "linear-gradient(90deg, #028090, #00a896)",
                      }}
                    />
                    <Card.Body className="d-flex flex-column p-3 p-md-4">
                      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start mb-2">
                        <Card.Title className="h5 fw-bold mb-1 mb-sm-0">
                          {exp.title}
                        </Card.Title>
                        <span className="badge bg-body-secondary text-primary border small flex-shrink-0 mt-1 mt-sm-0">
                          {exp.period}
                        </span>
                      </div>
                      {exp.company && (
                        <div className="h6 text-primary fw-semibold mb-3">
                          {exp.company}
                        </div>
                      )}
                      <Card.Text className="mb-3 text-muted">
                        {exp.description}
                      </Card.Text>
                      <ul className="ps-3 mb-0">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-muted mb-1.5">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </motion.section>
  );
};

export default Experience;
