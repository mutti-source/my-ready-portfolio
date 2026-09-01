"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import {
  staggerContainer,
  staggerFast,
  fadeInUp,
  tagPop,
} from "@/src/components/AnimationVariants";
import { skills } from "@/src/data/skills";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";

const cardThemes = [
  {
    gradient: "linear-gradient(90deg, #00e5ff, #00a896)",
    glow: "rgba(0, 229, 255, 0.25)",
    badgeClass: "text-info border-info border-opacity-30",
  },
  {
    gradient: "linear-gradient(90deg, #00a896, #028090)",
    glow: "rgba(0, 168, 150, 0.25)",
    badgeClass: "text-teal-400 border-teal-500 border-opacity-30",
  },
  {
    gradient: "linear-gradient(90deg, #028090, #3b82f6)",
    glow: "rgba(2, 128, 144, 0.25)",
    badgeClass: "text-cyan-400 border-cyan-500 border-opacity-30",
  },
  {
    gradient: "linear-gradient(90deg, #3b82f6, #6366f1)",
    glow: "rgba(59, 130, 246, 0.25)",
    badgeClass: "text-blue-400 border-blue-500 border-opacity-30",
  },
  {
    gradient: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    glow: "rgba(99, 102, 241, 0.25)",
    badgeClass: "text-indigo-400 border-indigo-500 border-opacity-30",
  },
  {
    gradient: "linear-gradient(90deg, #8b5cf6, #00e5ff)",
    glow: "rgba(139, 92, 246, 0.25)",
    badgeClass: "text-purple-400 border-purple-500 border-opacity-30",
  },
];

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Skills & Technical Arsenal"
          subtitle="A powerful blend of enterprise business analysis, implementation leadership, and full-stack software development."
        />

        {/* Categorized 3D Skill Groups */}
        <Row className="g-3 g-md-4 justify-content-center">
          {skills.map((group, index) => {
            const theme = cardThemes[index % cardThemes.length];
            return (
              <Col key={index} xs={12} sm={10} md={6} lg={4}>
                <motion.div variants={fadeInUp} className="h-100">
                  <Card3D
                    maxTilt={10}
                    glowColor={theme.glow}
                    className="p-3 p-md-4 h-100"
                  >
                    <div
                      className="position-absolute top-0 start-0 w-100"
                      style={{
                        height: "3px",
                        background: theme.gradient,
                      }}
                    />

                    <div
                      className="d-flex align-items-center justify-content-between mb-3"
                      style={{ transform: "translateZ(25px)" }}
                    >
                      <h3 className="fw-bold fs-5 text-light mb-0">{group.title}</h3>
                      <span className={`badge bg-body-secondary border ${theme.badgeClass}`}>
                        {group.skills.length} skills
                      </span>
                    </div>

                    {/* Staggered 3D Tag Pop-in */}
                    <motion.div
                      className="d-flex flex-wrap gap-2"
                      variants={staggerFast}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      style={{ transform: "translateZ(15px)" }}
                    >
                      {group.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="badge bg-body-secondary text-light px-2.5 px-md-3 py-2 fw-normal border border-secondary border-opacity-25"
                          variants={tagPop}
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "rgba(0, 229, 255, 0.2)",
                            borderColor: "#00e5ff",
                            color: "#ffffff",
                            boxShadow: "0 0 12px rgba(0, 229, 255, 0.4)",
                          }}
                          transition={{ duration: 0.2 }}
                          style={{ cursor: "default" }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
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

export default Skills;
