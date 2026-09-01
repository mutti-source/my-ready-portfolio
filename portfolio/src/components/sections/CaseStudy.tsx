"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import {
  staggerContainer,
  fadeInUp,
  childVariants,
} from "@/src/components/AnimationVariants";
import { caseStudy } from "@/src/data/caseStudy";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";
import { FaExclamationTriangle, FaLightbulb, FaTrophy } from "react-icons/fa";

const CaseStudy = () => {
  return (
    <motion.section
      id="case-study"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Featured Enterprise Case Study"
          subtitle="Real-world enterprise SaaS onboarding, workflow engineering, and measurable outcome."
        />

        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}>
            <motion.div variants={fadeInUp}>
              <Card3D
                maxTilt={8}
                glowColor="rgba(0, 229, 255, 0.35)"
                className="overflow-hidden"
              >
                <div className="hologram-scanline" />
                {/* 3D Header Banner */}
                <div
                  className="py-4 px-4 px-md-5 text-white position-relative"
                  style={{
                    background: "linear-gradient(135deg, #006b7d, #008f9b, #00e5ff)",
                    transform: "translateZ(30px)",
                  }}
                >
                  <div className="badge bg-dark text-info mb-2 border border-info border-opacity-30">
                    Impact Deep Dive
                  </div>
                  <h3 className="h4 fs-4 fw-bold mb-1 text-white">
                    {caseStudy.title}
                  </h3>
                  <div className="text-white opacity-85 small">{caseStudy.context}</div>
                </div>

                <div className="p-4 p-md-5">
                  <motion.div
                    className="row g-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {/* The Problem */}
                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <div style={{ transform: "translateZ(20px)" }}>
                        <h4 className="h5 fw-bold text-info mb-2 d-flex align-items-center gap-2">
                          <FaExclamationTriangle className="text-warning small" />
                          <span>The Challenge & Bottleneck</span>
                        </h4>
                        <p className="text-muted mb-0 lh-lg">{caseStudy.problem}</p>
                      </div>
                    </Col>

                    {/* The Approach */}
                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <div style={{ transform: "translateZ(25px)" }}>
                        <h4 className="h5 fw-bold text-info mb-2 d-flex align-items-center gap-2">
                          <FaLightbulb className="text-info small" />
                          <span>Strategic Solution & Technical Architecture</span>
                        </h4>
                        <p className="text-muted mb-0 lh-lg">{caseStudy.approach}</p>
                      </div>
                    </Col>

                    {/* The Outcome Callout */}
                    <Col xs={12} as={motion.div} variants={childVariants}>
                      <div
                        className="p-4 rounded-3 border border-info border-opacity-40 position-relative overflow-hidden"
                        style={{
                          background: "rgba(0, 229, 255, 0.08)",
                          backdropFilter: "blur(10px)",
                          transform: "translateZ(40px)",
                          boxShadow: "0 10px 30px rgba(0, 229, 255, 0.15)",
                        }}
                      >
                        <h4 className="h5 fw-bold text-light mb-2 d-flex align-items-center gap-2">
                          <FaTrophy className="text-warning" />
                          <span className="gradient-text-cyber">The Business Impact & Measurable Outcome</span>
                        </h4>
                        <p className="mb-0 text-light fw-medium lh-base">
                          {caseStudy.outcome}
                        </p>
                      </div>
                    </Col>
                  </motion.div>
                </div>
              </Card3D>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default CaseStudy;
