"use client";

import { personalInfo } from "@/src/data/personalInfo";
import { socialLinks } from "@/src/data/socialLinks";
import { Container, Row, Col } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaCube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="py-4 mt-5 position-relative border-top border-info border-opacity-20 bg-black bg-opacity-60 backdrop-blur">
      <Container>
        <Row className="align-items-center g-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <p className="mb-0 small text-muted d-flex align-items-center justify-content-center justify-content-md-start gap-1.5">
              <FaCube className="text-info" />
              <span>
                © {new Date().getFullYear()}{" "}
                <strong className="text-light">{personalInfo.name}</strong>. Built with Three.js & Next.js.
              </span>
            </p>
          </Col>

          <Col xs={12} md={6} className="text-center text-md-end">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 small">
              {socialLinks.map((link, index) => {
                let Icon = FaEnvelope;
                if (link.title === "Github") Icon = FaGithub;
                else if (link.title === "LinkedIn") Icon = FaLinkedin;
                else if (link.title === "Email") Icon = FaEnvelope;
                else if (link.title === "WhatsApp") Icon = FaWhatsapp;

                return (
                  <a
                    key={index}
                    href={link.link}
                    target={link.title !== "Email" ? "_blank" : undefined}
                    rel={link.title !== "Email" ? "noopener noreferrer" : undefined}
                    className="text-muted text-decoration-none d-inline-flex align-items-center gap-1 hover-opacity py-1"
                  >
                    <Icon className="text-info" />
                    <span>{link.title}</span>
                  </a>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
