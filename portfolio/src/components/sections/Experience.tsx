"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { experiences } from "@/src/data/experiences";

const Experience = () => {


  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="experience"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <h2 className="text-center display-6 fw-semibold mb-4 mb-md-5">Experience</h2>
        <Row className="g-3 g-md-4">
          {experiences.map((exp, index) => (
            <Col key={index} xs={12} md={6}>
              <motion.div variants={item} className="h-100">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column p-3 p-md-4">
                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start mb-2">
                      <Card.Title className="h5 fw-bold mb-1 mb-sm-0">{exp.title}</Card.Title>
                      <span className="text-muted small flex-shrink-0 mt-1 mt-sm-0">{exp.period}</span>
                    </div>
                    {exp.company && (
                      <div className="h6 text-primary mb-3">{exp.company}</div>
                    )}
                    <Card.Text className="mb-3 text-muted">{exp.description}</Card.Text>
                    <ul className="ps-3 mb-0">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-muted mb-1">
                          {resp}
                        </li>
                      ))}
                    </ul>
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

export default Experience;
