"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCube, FaBolt, FaTachometerAlt, FaSlidersH } from "react-icons/fa";

interface Floating3DControlsProps {
  particleSpeed: number;
  setParticleSpeed: (speed: number) => void;
  wireframeMode: boolean;
  setWireframeMode: (mode: boolean) => void;
}

const Floating3DControls: React.FC<Floating3DControlsProps> = ({
  particleSpeed,
  setParticleSpeed,
  wireframeMode,
  setWireframeMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pulsing, setPulsing] = useState(false);

  const triggerShockwave = () => {
    setPulsing(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio-3d-shockwave"));
    }
    setTimeout(() => setPulsing(false), 800);
  };

  const cycleSpeed = () => {
    if (particleSpeed === 1) setParticleSpeed(1.8);
    else if (particleSpeed === 1.8) setParticleSpeed(2.6);
    else setParticleSpeed(1);
  };

  return (
    <div
      className="position-fixed bottom-0 start-0 m-3 m-md-4 z-3"
      style={{ pointerEvents: "auto" }}
    >
      <div className="position-relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="card-glass-3d p-3 mb-2 shadow-lg"
              style={{
                minWidth: "220px",
                backdropFilter: "blur(20px)",
                background: "rgba(10, 15, 29, 0.9)",
              }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2.5 pb-2 border-bottom border-secondary border-opacity-25">
                <span className="small fw-bold gradient-text-cyber d-flex align-items-center gap-1.5">
                  <FaCube className="text-info" /> 3D Scene Controls
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                {/* Shockwave Trigger */}
                <button
                  type="button"
                  onClick={triggerShockwave}
                  className="btn btn-sm btn-outline-cyber d-flex align-items-center justify-content-between py-1.5 px-2.5"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaBolt className="text-warning" /> Energy Pulse
                  </span>
                  <span className="badge bg-body-secondary text-info">Burst</span>
                </button>

                {/* Speed Cycle */}
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="btn btn-sm btn-outline-cyber d-flex align-items-center justify-content-between py-1.5 px-2.5"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaTachometerAlt className="text-info" /> Orbit Speed
                  </span>
                  <span className="badge bg-body-secondary text-primary">
                    {particleSpeed === 1
                      ? "1.0x"
                      : particleSpeed === 1.8
                      ? "1.8x"
                      : "2.6x"}
                  </span>
                </button>

                {/* Wireframe toggle */}
                <button
                  type="button"
                  onClick={() => setWireframeMode(!wireframeMode)}
                  className="btn btn-sm btn-outline-cyber d-flex align-items-center justify-content-between py-1.5 px-2.5"
                  style={{ fontSize: "0.8rem" }}
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaCube className="text-info" /> Shard Wireframe
                  </span>
                  <span
                    className={`badge ${
                      wireframeMode ? "bg-primary text-light" : "bg-body-secondary text-muted"
                    }`}
                  >
                    {wireframeMode ? "ON" : "OFF"}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle HUD Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-dark rounded-pill px-3 py-2 d-flex align-items-center gap-2 shadow-lg border border-info border-opacity-30"
          style={{
            background: "rgba(10, 15, 29, 0.85)",
            backdropFilter: "blur(12px)",
            color: "#00e5ff",
            fontSize: "0.85rem",
            boxShadow: pulsing
              ? "0 0 25px rgba(0, 229, 255, 0.8)"
              : "0 4px 20px rgba(0, 0, 0, 0.4)",
          }}
          whileHover={{ scale: 1.06, borderColor: "#00e5ff" }}
          whileTap={{ scale: 0.94 }}
        >
          <span className="status-pulse-dot" />
          <span className="fw-semibold">3D Mode</span>
          <FaSlidersH className="ms-1 small opacity-75" />
        </motion.button>
      </div>
    </div>
  );
};

export default Floating3DControls;
