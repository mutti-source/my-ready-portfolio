"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { skills } from "@/src/data/skills";


const Skills = () => {


  return (
    <motion.section
      id="skills"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <h2 className="text-center fw-semibold display-6 mb-4 mb-md-5">
          Skills
        </h2>

        <Row className="g-3 g-md-4 justify-content-center">
          {skills.map((group, index) => (
            <Col key={index} xs={12} sm={10} md={6} lg={4}>
              <motion.div variants={childVariants} className="h-100">
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-3 p-md-4">
                    <Card.Title className="fw-semibold mb-3 fs-5">
                      {group.title}
                    </Card.Title>
                    <div className="d-flex flex-wrap gap-2">
                      {group.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="badge bg-secondary text-light px-2.5 px-md-3 py-2 fw-normal"
                          whileHover={{ scale: 1.05, boxShadow: "0px 4px 10px rgba(0,0,0,0.15)" }}
                          transition={{ duration: 0.2 }}
                          style={{ cursor: "default" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
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

export default Skills;
