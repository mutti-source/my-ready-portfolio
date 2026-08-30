"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Hero3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 130;
    const maxDistance = isMobile ? 65 : 90;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 220;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Color definitions (Deep Teal & Cyan palette)
    const primaryColor = new THREE.Color(0x00a896); // Teal
    const accentColor = new THREE.Color(0x028090);  // Deep Cyan
    const highlightColor = new THREE.Color(0x00e5ff); // Bright Cyan glow

    // Central Floating 3D Geometric Polyhedron (Icosahedron wireframe)
    const icosahedronGeo = new THREE.IcosahedronGeometry(isMobile ? 35 : 50, 1);
    const wireframeGeo = new THREE.WireframeGeometry(icosahedronGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: 0.28,
      linewidth: 1,
    });
    const icosahedronMesh = new THREE.LineSegments(wireframeGeo, lineMat);
    scene.add(icosahedronMesh);

    // Inner Glowing Core Polyhedron
    const innerGeo = new THREE.OctahedronGeometry(isMobile ? 16 : 24, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Particles (Nodes)
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    const spreadX = isMobile ? 220 : 380;
    const spreadY = isMobile ? 180 : 260;
    const spreadZ = 160;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * spreadX;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.22,
        y: (Math.random() - 0.5) * 0.22,
        z: (Math.random() - 0.5) * 0.15,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Create particle texture via canvas for glowing dots
    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(0, 229, 255, 1)");
      gradient.addColorStop(0.4, "rgba(0, 168, 150, 0.7)");
      gradient.addColorStop(1, "rgba(0, 168, 150, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 4 : 5.5,
      map: particleTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Dynamic Connections between Nodes
    const maxLines = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Mouse Interaction (Damped Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) * 0.0006;
      targetY = (e.clientY - halfH) * 0.0006;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver & Visibility API for zero background CPU drain
    let isVisible = true;
    let animationFrameId: number | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animate();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && !animationFrameId) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate geometric meshes
      icosahedronMesh.rotation.x = elapsedTime * 0.08 + mouseY * 1.5;
      icosahedronMesh.rotation.y = elapsedTime * 0.12 + mouseX * 1.5;

      innerMesh.rotation.x = -elapsedTime * 0.14 - mouseY * 2;
      innerMesh.rotation.y = -elapsedTime * 0.18 - mouseX * 2;

      // Update particle positions
      const positions = particleGeometry.attributes.position.array as Float32Array;
      let vertexPosIndex = 0;
      let colorPosIndex = 0;
      let connections = 0;

      for (let i = 0; i < particleCount; i++) {
        // Move particle
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Bounce within boundaries
        const halfSpreadX = spreadX / 2;
        const halfSpreadY = spreadY / 2;
        const halfSpreadZ = spreadZ / 2;

        if (positions[i * 3] < -halfSpreadX || positions[i * 3] > halfSpreadX) {
          particleVelocities[i].x = -particleVelocities[i].x;
        }
        if (positions[i * 3 + 1] < -halfSpreadY || positions[i * 3 + 1] > halfSpreadY) {
          particleVelocities[i].y = -particleVelocities[i].y;
        }
        if (positions[i * 3 + 2] < -halfSpreadZ || positions[i * 3 + 2] > halfSpreadZ) {
          particleVelocities[i].z = -particleVelocities[i].z;
        }

        // Draw connections to nearby nodes (limited count for 60fps performance)
        if (!isMobile || i % 2 === 0) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDistance) {
              const alpha = (1.0 - dist / maxDistance) * 0.45;

              linePositions[vertexPosIndex++] = positions[i * 3];
              linePositions[vertexPosIndex++] = positions[i * 3 + 1];
              linePositions[vertexPosIndex++] = positions[i * 3 + 2];

              linePositions[vertexPosIndex++] = positions[j * 3];
              linePositions[vertexPosIndex++] = positions[j * 3 + 1];
              linePositions[vertexPosIndex++] = positions[j * 3 + 2];

              lineColors[colorPosIndex++] = primaryColor.r * alpha;
              lineColors[colorPosIndex++] = primaryColor.g * alpha;
              lineColors[colorPosIndex++] = primaryColor.b * alpha;

              lineColors[colorPosIndex++] = highlightColor.r * alpha;
              lineColors[colorPosIndex++] = highlightColor.g * alpha;
              lineColors[colorPosIndex++] = highlightColor.b * alpha;

              connections++;
            }
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      linesGeometry.setDrawRange(0, connections * 2);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      // Parallax camera tilt
      camera.position.x = mouseX * 45;
      camera.position.y = -mouseY * 45;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icosahedronGeo.dispose();
      wireframeGeo.dispose();
      lineMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.6,
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
};

export default Hero3DBackground;
