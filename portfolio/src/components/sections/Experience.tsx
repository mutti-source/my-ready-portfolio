"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import {
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/src/components/AnimationVariants";
import { experiences } from "@/src/data/experiences";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";
import { FaBriefcase, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Professional Experience"
          subtitle="Proven leadership in enterprise SaaS client onboarding, business analysis, and full-stack engineering."
        />

        <Row className="g-4">
          {experiences.map((exp, index) => {
            const cardVariant = index % 2 === 0 ? slideInLeft : slideInRight;

            return (
              <Col key={index} xs={12} md={6}>
                <motion.div variants={cardVariant} className="h-100">
                  <Card3D
                    maxTilt={12}
                    glowColor={
                      index === 0
                        ? "rgba(0, 229, 255, 0.35)"
                        : "rgba(0, 168, 150, 0.35)"
                    }
                    className="p-4 h-100 d-flex flex-column"
                  >
                    <div
                      className="position-absolute top-0 start-0 w-100"
                      style={{
                        height: "3px",
                        background:
                          index === 0
                            ? "linear-gradient(90deg, #00e5ff, #00a896)"
                            : "linear-gradient(90deg, #00a896, #028090)",
                      }}
                    />
                    <div className="hologram-scanline" />

                    {/* Card Title & Period */}
                    <div
                      className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-start mb-2"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <h3 className="h5 fw-bold text-light mb-1 mb-sm-0 d-flex align-items-center gap-2">
                        <FaBriefcase className="text-info small" />
                        {exp.title}
                      </h3>
                      <span className="badge bg-body-secondary text-info border border-info border-opacity-30 small flex-shrink-0 mt-1 mt-sm-0 d-flex align-items-center gap-1.5">
                        <FaCalendarAlt className="small" />
                        {exp.period}
                      </span>
                    </div>

                    {exp.company && (
                      <div
                        className="h6 text-info fw-semibold mb-3"
                        style={{ transform: "translateZ(25px)" }}
                      >
                        {exp.company}
                      </div>
                    )}

                    <p
                      className="mb-3 text-muted small lh-base"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {exp.description}
                    </p>

                    {/* Responsibilities list */}
                    <ul
                      className="ps-3 mb-0 text-muted small"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="mb-2 lh-base">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </Card3D>
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
