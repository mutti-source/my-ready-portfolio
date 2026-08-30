"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope,FaWhatsapp } from "react-icons/fa";
import { staggerContainer, childVariants } from "@/src/components/AnimationVariants";
import { socialLinks } from "@/src/data/socialLinks";
import { personalInfo } from "@/src/data/personalInfo";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <Container>
        <motion.div variants={childVariants}>
          <Row className="justify-content-center text-center mb-4 mb-md-5">
            <Col xs={12} sm={10} md={8} lg={6}>
              <h2 className="fw-semibold display-6 mb-3">Contact</h2>
              <p className="text-muted fs-6 fs-md-5">
                Reach out for job opportunities or professional collaborations.
              </p>
            </Col>
          </Row>
        </motion.div>

        <motion.div variants={childVariants}>
          <Row className="justify-content-center mb-4">
            <Col xs={12} sm={8} md={6}>
              <div className="d-flex justify-content-center gap-3 gap-md-4 fs-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.title}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted p-2"
                    aria-label={link.title}
                  >
                    {link.title === "Github" && <FaGithub />}
                    {link.title === "LinkedIn" && <FaLinkedin />}
                    {link.title === "Email" && <FaEnvelope />}
                    {link.title === "WhatsApp" && <FaWhatsapp />}
                  </a>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

        <motion.div variants={childVariants}>
          <Row className="justify-content-center">
            <Col xs={12} sm={11} md={8} lg={6}>
              <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name"
                  required
                  className="py-2.5 px-3"
                />
                <Form.Control
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  required
                  className="py-2.5 px-3"
                />
                <Form.Control
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  as="textarea"
                  rows={4}
                  placeholder="Message"
                  required
                  className="py-2.5 px-3"
                />

                {status === "success" && (
                  <Alert variant="success">Message sent successfully!</Alert>
                )}
                {status === "error" && (
                  <Alert variant="danger">Something went wrong. Try again.</Alert>
                )}

                <div className="d-grid mt-2">
                  <Button variant="primary" size="lg" type="submit" disabled={status === "loading"} className="btn-primary-custom">
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-4">
                <p className="text-muted mb-2 small">Or reach me directly on</p>

                <Button
                  variant="success"
                  className="d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 w-100 w-sm-auto"
                  href={`https://wa.me/${personalInfo.phone}?text=${encodeURIComponent(
                    "Hi! I came across your portfolio and would like to connect."
                  )}`}
                  target="_blank"
                >
                  <FaWhatsapp /> WhatsApp Me
                </Button>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </motion.section>
  );
};

export default Contact;
