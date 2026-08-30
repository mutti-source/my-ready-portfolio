"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { caseStudy } from "@/src/data/caseStudy";

const CaseStudy = () => {
  return (
    <motion.section
      id="case-study"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <h2 className="text-center fw-semibold display-6 mb-4 mb-md-5">
          Featured Case Study
        </h2>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <motion.div variants={childVariants}>
              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="card-header bg-primary text-white py-3 py-md-4 px-3 px-md-4 px-lg-5">
                  <h3 className="h4 fs-5 fs-md-4 fw-bold mb-1 text-white">{caseStudy.title}</h3>
                  <div className="text-white-50 small fs-6">{caseStudy.context}</div>
                </div>
                <Card.Body className="p-3 p-md-4 p-lg-5">
                  <Row className="g-3 g-md-4">
                    <Col xs={12}>
                      <h4 className="h5 fw-bold text-primary mb-2 mb-md-3">The Problem</h4>
                      <p className="text-muted mb-0">
                        {caseStudy.problem}
                      </p>
                    </Col>
                    <Col xs={12}>
                      <h4 className="h5 fw-bold text-primary mb-2 mb-md-3">The Approach</h4>
                      <p className="text-muted mb-0">
                        {caseStudy.approach}
                      </p>
                    </Col>
                    <Col xs={12}>
                      <div className="p-3 p-md-4 bg-body-secondary rounded border-start border-4 border-primary">
                        <h4 className="h5 fw-bold text-primary mb-2 mb-md-3">The Outcome</h4>
                        <p className="mb-0 fw-medium">
                          {caseStudy.outcome}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default CaseStudy;
