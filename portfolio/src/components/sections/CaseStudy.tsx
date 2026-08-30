"use client";

import { motion } from "framer-motion";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  staggerContainer,
  fadeInUp,
  childVariants,
} from "@/src/components/AnimationVariants";
import { caseStudy } from "@/src/data/caseStudy";
import SectionHeading from "@/src/components/SectionHeading";

const CaseStudy = () => {
  return (
    <motion.section
      id="case-study"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Featured Case Study"
          subtitle="Real-world enterprise SaaS onboarding and digital transformation outcome."
        />

        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <motion.div variants={fadeInUp}>
              <Card className="shadow-lg border-0 overflow-hidden position-relative">
                <div
                  className="card-header text-white py-3 py-md-4 px-3 px-md-4 px-lg-5"
                  style={{
                    background: "linear-gradient(135deg, #006b7d, #008f9b)",
                  }}
                >
                  <h3 className="h4 fs-5 fs-md-4 fw-bold mb-1 text-white">
                    {caseStudy.title}
                  </h3>
                  <div className="text-white-50 small fs-6">{caseStudy.context}</div>
                </div>

                <Card.Body className="p-3 p-md-4 p-lg-5">
                  <motion.div
                    className="row g-3 g-md-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <h4 className="h5 fw-bold text-primary mb-2 mb-md-3 d-flex align-items-center gap-2">
                        <span>The Problem</span>
                      </h4>
                      <p className="text-muted mb-0">{caseStudy.problem}</p>
                    </Col>

                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <h4 className="h5 fw-bold text-primary mb-2 mb-md-3 d-flex align-items-center gap-2">
                        <span>The Approach</span>
                      </h4>
                      <p className="text-muted mb-0">{caseStudy.approach}</p>
                    </Col>

                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <motion.div
                        className="p-3 p-md-4 bg-body-secondary rounded border-start border-4 border-primary position-relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h4 className="h5 fw-bold text-primary mb-2 mb-md-3 d-flex align-items-center gap-2">
                          <span>The Outcome</span>
                        </h4>
                        <p className="mb-0 fw-medium">{caseStudy.outcome}</p>
                      </motion.div>
                    </Col>
                  </motion.div>
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
