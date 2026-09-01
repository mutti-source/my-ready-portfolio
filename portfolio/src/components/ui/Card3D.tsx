"use client";

import React, { useRef, useState, useCallback, MouseEvent } from "react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
  enableGlare?: boolean;
  style?: React.CSSProperties;
}

const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  maxTilt = 12,
  glowColor = "rgba(0, 229, 255, 0.25)",
  enableGlare = true,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [transformStyle, setTransformStyle] = useState("");

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = (x / rect.width - 0.5) * 2; // -1 to 1
      const yPct = (y / rect.height - 0.5) * 2; // -1 to 1

      const rotX = -yPct * maxTilt;
      const rotY = xPct * maxTilt;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(
          2
        )}deg) scale3d(1.02, 1.02, 1.02)`
      );

      if (enableGlare) {
        setGlarePos({
          x: Math.round((x / rect.width) * 100),
          y: Math.round((y / rect.height) * 100),
        });
      }
    },
    [maxTilt, enableGlare]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  }, []);

  return (
    <div
      style={{
        perspective: "1200px",
        height: "100%",
      }}
    >
      <div
        ref={cardRef}
        className={`card-glass-3d ${className}`}
        style={{
          transform: transformStyle,
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.25s ease"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
          transformStyle: "preserve-3d",
          height: "100%",
          boxShadow: isHovered
            ? `0 20px 45px -10px ${glowColor}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`
            : "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
          ...style,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Dynamic Specular Glare Reflection */}
        {enableGlare && isHovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: "none",
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
              zIndex: 3,
              borderRadius: "inherit",
              transition: "background 0.05s ease",
            }}
          />
        )}

        {/* Inner Content with 3D Preservation */}
        <div
          style={{
            transformStyle: "preserve-3d",
            height: "100%",
            position: "relative",
            zIndex: 2,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card3D;
