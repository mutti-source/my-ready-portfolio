"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { staggerContainer, childVariants, fadeInUp } from "@/src/components/AnimationVariants";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";
import About3DStats from "@/src/components/sections/About3DStats";

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <SectionHeading
              title="About Me"
              subtitle="Bridging the gap between enterprise business needs and high-performance technical execution."
            />

            <motion.div variants={fadeInUp}>
              <Card3D
                maxTilt={8}
                glowColor="rgba(0, 229, 255, 0.2)"
                className="p-4 p-md-5"
              >
                <div className="hologram-scanline" />
                <motion.div
                  className="fs-6 text-light d-flex flex-column gap-3 lh-lg"
                  variants={staggerContainer}
                  style={{ transform: "translateZ(20px)" }}
                >
                  <motion.p variants={childVariants} className="mb-0 text-muted">
                    As an <strong className="text-light fw-semibold">Onboarding Specialist and Software Analyst</strong> at PlanStreet Inc., I lead enterprise SaaS implementations for U.S. state health and social-service organizations. My expertise lies in requirements gathering, leading User Acceptance Testing (UAT), and configuring complex workflows and conditional logic to ensure successful client adoptions.
                  </motion.p>
                  <motion.p variants={childVariants} className="mb-0 text-muted">
                    What sets me apart is my hands-on technical depth as a <strong className="text-info fw-semibold">Full-Stack Developer</strong>. I don't just gather requirements; I actively build and ship production features using <span className="text-light">Django, React.js, Next.js, and React Native</span>. This rare combination allows me to bridge the gap between business stakeholders and technical execution.
                  </motion.p>
                  <motion.p variants={childVariants} className="mb-0 text-muted">
                    Whether I'm optimizing digital forms to increase user adoption by <strong className="text-info fw-bold">40%</strong> or integrating real-time WebSockets and AI-assisted workflows into scalable applications, my focus is always on delivering measurable business impact through clean architecture and thoughtful problem-solving.
                  </motion.p>
                </motion.div>
              </Card3D>
            </motion.div>

            {/* 3D Metric Stat Cubes */}
            <motion.div variants={fadeInUp} className="mt-4">
              <About3DStats />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default About;
