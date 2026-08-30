"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { staggerContainer, childVariants, fadeInUp } from "@/src/components/AnimationVariants";
import SectionHeading from "@/src/components/SectionHeading";

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <SectionHeading title="About" />

            <motion.div variants={fadeInUp} className="h-100">
              <motion.div
                className="fs-6 fs-md-5 text-muted d-flex flex-column gap-3 lh-base lh-md-lg"
                variants={staggerContainer}
              >
                <motion.p variants={childVariants} className="mb-0">
                  As an <strong className="text-body fw-semibold">Onboarding Specialist and Software Analyst</strong> at PlanStreet Inc., I lead enterprise SaaS implementations for U.S. state health and social-service organizations. My expertise lies in requirements gathering, leading User Acceptance Testing (UAT), and configuring complex workflows and conditional logic to ensure successful client adoptions.
                </motion.p>
                <motion.p variants={childVariants} className="mb-0">
                  What sets me apart is my hands-on technical depth as a <strong className="text-body fw-semibold">Full-Stack Developer</strong>. I don't just gather requirements; I actively build and ship production features using Django, React.js, Next.js, and React Native. This rare combination allows me to bridge the gap between business needs and technical execution.
                </motion.p>
                <motion.p variants={childVariants} className="mb-0">
                  Whether I'm optimizing digital forms to increase user adoption by <strong className="text-primary fw-semibold">40%</strong> or integrating real-time WebSockets and AI-assisted workflows into scalable applications, my focus is always on delivering measurable business impact through clean architecture and thoughtful problem-solving.
                </motion.p>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default About;
