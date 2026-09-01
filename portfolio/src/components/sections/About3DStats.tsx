"use client";

import React from "react";
import { Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Card3D from "@/src/components/ui/Card3D";
import { FaAward, FaRocket, FaChartLine, FaCheckCircle } from "react-icons/fa";

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
  detail: string;
  glow: string;
}

const stats: Stat[] = [
  {
    icon: <FaAward className="text-info fs-3" />,
    value: "3+ Years",
    label: "Enterprise SaaS Leadership",
    detail: "Leading end-to-end client onboarding & state agency workflows",
    glow: "rgba(0, 229, 255, 0.3)",
  },
  {
    icon: <FaRocket className="text-primary fs-3" />,
    value: "40%",
    label: "Adoption Surge",
    detail: "Streamlined multi-step digital forms & conditional logic",
    glow: "rgba(0, 168, 150, 0.35)",
  },
  {
    icon: <FaChartLine className="text-info fs-3" />,
    value: "10+",
    label: "Full-Stack Projects",
    detail: "Production web & mobile apps with Django, React & Next.js",
    glow: "rgba(2, 128, 144, 0.35)",
  },
  {
    icon: <FaCheckCircle className="text-success fs-3" />,
    value: "100%",
    label: "UAT & Rollout Success",
    detail: "Rigorous testing & bridging client needs with engineering",
    glow: "rgba(16, 185, 129, 0.3)",
  },
];

const About3DStats: React.FC = () => {
  return (
    <Row className="g-3 g-md-4 mt-4">
      {stats.map((stat, idx) => (
        <Col key={idx} xs={12} sm={6} lg={3}>
          <Card3D
            maxTilt={14}
            glowColor={stat.glow}
            className="p-3 p-md-4 h-100 text-center"
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center h-100"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="mb-2 p-2.5 rounded-circle bg-body-secondary border border-info border-opacity-25"
                style={{ transform: "translateZ(30px)" }}
              >
                {stat.icon}
              </div>
              <div
                className="display-6 fw-bold gradient-text-cyber mb-1"
                style={{ transform: "translateZ(40px)" }}
              >
                {stat.value}
              </div>
              <div
                className="fw-semibold fs-6 text-light mb-1"
                style={{ transform: "translateZ(25px)" }}
              >
                {stat.label}
              </div>
              <p
                className="small text-muted mb-0"
                style={{ transform: "translateZ(15px)" }}
              >
                {stat.detail}
              </p>
            </div>
          </Card3D>
        </Col>
      ))}
    </Row>
  );
};

export default About3DStats;
