"use client";

import React from "react";
import { motion } from "framer-motion";
import { titleUnderline } from "@/src/components/AnimationVariants";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = "mb-4 mb-md-5",
}) => {
  return (
    <div className={`text-center ${className}`}>
      <motion.h2
        className="display-6 fw-semibold mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.55, ease: customEase }}
      >
        {title}
      </motion.h2>

      {/* Animated Accent Underline */}
      <motion.div
        className="mx-auto"
        style={{
          width: "60px",
          height: "3px",
          borderRadius: "2px",
          background: "linear-gradient(90deg, #006b7d, #00a896, #00e5ff)",
          transformOrigin: "center",
        }}
        variants={titleUnderline}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      />

      {subtitle && (
        <motion.p
          className="text-muted fs-6 fs-md-5 mt-3 mb-0 mx-auto"
          style={{ maxWidth: "600px" }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.15, ease: customEase }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
