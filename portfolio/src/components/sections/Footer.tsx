"use client";

import { personalInfo } from "@/src/data/personalInfo";
import { socialLinks } from "@/src/data/socialLinks";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaFileDownload, FaEnvelope, FaWhatsapp } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="align-items-center g-3">
          <Col xs={12} md={6} className="text-center text-md-start">
            <p className="mb-0 small text-white-50">
              © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
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
                    className="text-white text-decoration-none d-inline-flex align-items-center gap-1 hover-opacity py-1"
                  >
                    <Icon />
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
