"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import {
  staggerContainer,
  staggerFast,
  childVariants,
  fadeInUp,
  tagPop,
} from "@/src/components/AnimationVariants";
import { socialLinks } from "@/src/data/socialLinks";
import { personalInfo } from "@/src/data/personalInfo";
import SectionHeading from "@/src/components/SectionHeading";
import Card3D from "@/src/components/ui/Card3D";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Reach out for SaaS implementation consulting, enterprise onboarding leadership, or full-stack software development."
        />

        {/* Social Icons Bar */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={8} md={6}>
            <motion.div
              className="d-flex justify-content-center gap-3 gap-md-4 fs-3"
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.title}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted p-2"
                  aria-label={link.title}
                  variants={tagPop}
                  whileHover={{ scale: 1.25, color: "#00e5ff" }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.title === "Github" && <FaGithub />}
                  {link.title === "LinkedIn" && <FaLinkedin />}
                  {link.title === "Email" && <FaEnvelope />}
                  {link.title === "WhatsApp" && <FaWhatsapp />}
                </motion.a>
              ))}
            </motion.div>
          </Col>
        </Row>

        {/* 3D Contact Form Terminal */}
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={8} lg={6}>
            <motion.div variants={fadeInUp}>
              <Card3D
                maxTilt={10}
                glowColor="rgba(0, 229, 255, 0.3)"
                className="p-4 p-md-5 position-relative overflow-hidden"
              >
                <div className="hologram-scanline" />
                <div
                  className="position-absolute top-0 start-0 w-100"
                  style={{
                    height: "3px",
                    background: "linear-gradient(90deg, #00e5ff, #00a896)",
                  }}
                />

                <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ transform: "translateZ(25px)" }}>
                  <motion.div variants={childVariants}>
                    <Form.Label className="small text-muted fw-semibold">Your Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="e.g. John Doe"
                      required
                      className="py-2.5 px-3"
                    />
                  </motion.div>

                  <motion.div variants={childVariants}>
                    <Form.Label className="small text-muted fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="e.g. john@company.com"
                      required
                      className="py-2.5 px-3"
                    />
                  </motion.div>

                  <motion.div variants={childVariants}>
                    <Form.Label className="small text-muted fw-semibold">Message</Form.Label>
                    <Form.Control
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      as="textarea"
                      rows={4}
                      placeholder="Discuss project requirements, SaaS onboarding, or engineering..."
                      required
                      className="py-2.5 px-3"
                    />
                  </motion.div>

                  {status === "success" && (
                    <Alert variant="success" className="bg-dark border border-success text-success">
                      Message sent successfully! I'll get back to you shortly.
                    </Alert>
                  )}
                  {status === "error" && (
                    <Alert variant="danger" className="bg-dark border border-danger text-danger">
                      Something went wrong. Please reach out directly on WhatsApp or Email.
                    </Alert>
                  )}

                  <motion.div className="d-grid mt-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary-custom d-flex align-items-center justify-content-center gap-2"
                    >
                      <FaPaperPlane />
                      {status === "loading" ? "Transmitting..." : "Send Message"}
                    </Button>
                  </motion.div>
                </Form>

                <div
                  className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <p className="text-muted mb-2 small">Prefer instant messaging?</p>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="d-inline-block">
                    <Button
                      variant="success"
                      className="d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 w-100 w-sm-auto shadow-sm"
                      style={{ borderRadius: "10px", fontWeight: 600 }}
                      href={`https://wa.me/${personalInfo.phone}?text=${encodeURIComponent(
                        "Hi Mutti! I came across your portfolio and would like to connect regarding an opportunity."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="fs-5" /> Direct WhatsApp Chat
                    </Button>
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

export default Contact;
