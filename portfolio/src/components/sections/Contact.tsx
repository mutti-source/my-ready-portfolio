"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp } from "react-icons/fa";
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
      className="py-4 py-md-5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
    >
      <Container>
        <SectionHeading
          title="Get In Touch"
          subtitle="Reach out for job opportunities, SaaS implementation consulting, or technical collaborations."
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
                  whileHover={{ scale: 1.2, color: "#006b7d" }}
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

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col xs={12} sm={11} md={8} lg={6}>
            <motion.div variants={fadeInUp}>
              <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                <motion.div variants={childVariants}>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    required
                    className="py-2.5 px-3 shadow-none border"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <Form.Control
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    required
                    className="py-2.5 px-3 shadow-none border"
                  />
                </motion.div>

                <motion.div variants={childVariants}>
                  <Form.Control
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="py-2.5 px-3 shadow-none border"
                  />
                </motion.div>

                {status === "success" && (
                  <Alert variant="success">Message sent successfully!</Alert>
                )}
                {status === "error" && (
                  <Alert variant="danger">Something went wrong. Try again.</Alert>
                )}

                <motion.div className="d-grid mt-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary-custom"
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted mb-2 small">Or reach me directly on</p>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="d-inline-block">
                  <Button
                    variant="success"
                    className="d-inline-flex align-items-center justify-content-center gap-2 px-4 py-2 w-100 w-sm-auto shadow-sm"
                    href={`https://wa.me/${personalInfo.phone}?text=${encodeURIComponent(
                      "Hi! I came across your portfolio and would like to connect."
                    )}`}
                    target="_blank"
                  >
                    <FaWhatsapp /> WhatsApp Me
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Contact;
