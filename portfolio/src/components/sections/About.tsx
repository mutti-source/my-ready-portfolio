"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";


const About = () => {


  return (
    <motion.section
      id="about"
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h2 className="text-center fw-semibold display-6 mb-4">
              About
            </h2>
            <motion.div variants={childVariants} className="h-100">
              <div className="fs-6 fs-md-5 text-muted d-flex flex-column gap-3 lh-base lh-md-lg">
                <p className="mb-0">
                  As an Onboarding Specialist and Software Analyst at PlanStreet Inc., I lead enterprise SaaS implementations for U.S. state health and social-service organizations. My expertise lies in requirements gathering, leading User Acceptance Testing (UAT), and configuring complex workflows and conditional logic to ensure successful client adoptions.
                </p>
                <p className="mb-0">
                  What sets me apart is my hands-on technical depth as a Full-Stack Developer. I don't just gather requirements; I actively build and ship production features using Django, React.js, Next.js, and React Native. This rare combination allows me to bridge the gap between business needs and technical execution.
                </p>
                <p className="mb-0">
                  Whether I'm optimizing digital forms to increase user adoption by 40% or integrating real-time WebSockets and AI-assisted workflows into scalable applications, my focus is always on delivering measurable business impact through clean architecture and thoughtful problem-solving.
                </p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default About;
