"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const HeroCyberCore3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;
    const isMobile = window.innerWidth < 768;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 160;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.cursor = "grab";
    container.appendChild(renderer.domElement);

    // Color definitions
    const primaryCyan = new THREE.Color(0x00e5ff);
    const accentTeal = new THREE.Color(0x00a896);
    const deepNeon = new THREE.Color(0x028090);

    // Lighting inside 3D Core
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(primaryCyan, 3, 200);
    pointLight.position.set(20, 30, 60);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(accentTeal, 2, 200);
    backLight.position.set(-30, -30, -50);
    scene.add(backLight);

    // Master Group for 3D Interactive Object
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Center Core - Glowing Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(
      isMobile ? 22 : 28,
      isMobile ? 5.5 : 7,
      100,
      16,
      2,
      3
    );
    const torusMat = new THREE.MeshStandardMaterial({
      color: primaryCyan,
      roughness: 0.15,
      metalness: 0.9,
      wireframe: true,
      emissive: new THREE.Color(0x003344),
      emissiveIntensity: 0.8,
    });
    const torusMesh = new THREE.Mesh(torusKnotGeo, torusMat);
    coreGroup.add(torusMesh);

    // 2. Inner Glowing Nucleus - Octahedron
    const innerGeo = new THREE.OctahedronGeometry(isMobile ? 12 : 16, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: accentTeal,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // 3. Orbital Gyro Ring 1 (Horizontal Inclined)
    const ring1Geo = new THREE.TorusGeometry(isMobile ? 38 : 48, 0.8, 16, 80);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: primaryCyan,
      roughness: 0.2,
      metalness: 0.8,
      emissive: primaryCyan,
      emissiveIntensity: 0.4,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Orbital Gyro Ring 2 (Counter-Inclined)
    const ring2Geo = new THREE.TorusGeometry(isMobile ? 44 : 56, 0.8, 16, 80);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: deepNeon,
      roughness: 0.2,
      metalness: 0.8,
      emissive: deepNeon,
      emissiveIntensity: 0.3,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Satellites / Tech Nodes orbiting
    const satelliteGroup = new THREE.Group();
    coreGroup.add(satelliteGroup);

    const satGeo = new THREE.BoxGeometry(3, 3, 3);
    const satMat = new THREE.MeshStandardMaterial({
      color: primaryCyan,
      emissive: primaryCyan,
      emissiveIntensity: 0.9,
    });

    const satellites: THREE.Mesh[] = [];
    const satCount = 6;
    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = isMobile ? 48 : 62;
      sat.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 12,
        Math.sin(angle) * radius
      );
      satelliteGroup.add(sat);
      satellites.push(sat);
    }

    // 6. Orbital Particle Cloud
    const pCount = 50;
    const pPositions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = (isMobile ? 40 : 54) + Math.random() * 18;
      pPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: primaryCyan,
      size: 2.5,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const pMesh = new THREE.Points(pGeo, pMat);
    coreGroup.add(pMesh);

    // Interactive Drag to Orbit & Mouse Tilt
    let isUserInteracting = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isUserInteracting = true;
      setIsDragging(true);
      renderer.domElement.style.cursor = "grabbing";
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isUserInteracting) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;

      rotationVelocityY = deltaX * 0.006;
      rotationVelocityX = deltaY * 0.006;

      coreGroup.rotation.y += rotationVelocityY;
      coreGroup.rotation.x += rotationVelocityX;

      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerUp = () => {
      isUserInteracting = false;
      setIsDragging(false);
      renderer.domElement.style.cursor = "grab";
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    dom.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Hover detection for acceleration
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);
    dom.addEventListener("mouseenter", onMouseEnter);
    dom.addEventListener("mouseleave", onMouseLeave);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number | null = null;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      const speedMultiplier = isHovered ? 2.2 : 1.0;

      // Apply inertia damping when not dragging
      if (!isUserInteracting) {
        rotationVelocityX *= 0.94;
        rotationVelocityY *= 0.94;
        coreGroup.rotation.x += rotationVelocityX;
        coreGroup.rotation.y += rotationVelocityY;

        // Base idle rotation
        coreGroup.rotation.y += 0.006 * speedMultiplier;
        coreGroup.rotation.x += 0.003 * speedMultiplier;
      }

      // Internal sub-mesh counter rotations
      torusMesh.rotation.z = elapsed * 0.2 * speedMultiplier;
      innerMesh.rotation.y = -elapsed * 0.4 * speedMultiplier;
      ring1.rotation.z = elapsed * 0.35 * speedMultiplier;
      ring2.rotation.x = -elapsed * 0.3 * speedMultiplier;
      satelliteGroup.rotation.y = elapsed * 0.5 * speedMultiplier;

      // Pulse emissive glow on hover
      const pulse = 0.6 + Math.sin(elapsed * 4) * 0.3;
      torusMat.emissiveIntensity = isHovered ? pulse * 1.5 : 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      dom.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      dom.removeEventListener("mouseenter", onMouseEnter);
      dom.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", handleResize);

      if (container.contains(dom)) {
        container.removeChild(dom);
      }

      torusKnotGeo.dispose();
      torusMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      satGeo.dispose();
      satMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <div className="position-relative w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "420px",
          height: "380px",
          position: "relative",
          zIndex: 2,
        }}
      />
      {/* Interactive prompt hint */}
      {/* <div
        className="text-center small text-muted-foreground mt-1 user-select-none"
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: isDragging ? 1 : 0.7,
          transition: "opacity 0.2s ease",
        }}
      >
        <span className="badge bg-body-secondary text-primary border me-1.5">3D Model</span>
        Click & Drag to Rotate in 3D
      </div> */}
    </div>
  );
};

export default HeroCyberCore3D;
