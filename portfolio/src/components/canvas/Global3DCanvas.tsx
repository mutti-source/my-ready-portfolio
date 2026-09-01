"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Global3DCanvasProps {
  particleSpeed?: number;
  wireframeMode?: boolean;
}

const Global3DCanvas: React.FC<Global3DCanvasProps> = ({
  particleSpeed = 1,
  wireframeMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 80 : 180;
    const shardCount = isMobile ? 6 : 14;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.domElement.style.position = "fixed";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100vw";
    renderer.domElement.style.height = "100vh";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.zIndex = "0";
    container.appendChild(renderer.domElement);

    // Color Palette
    const cyanColor = new THREE.Color(0x00e5ff);
    const tealColor = new THREE.Color(0x00a896);
    const deepBlueColor = new THREE.Color(0x028090);

    // Dynamic Roving Cursor Light
    const cursorLight = new THREE.PointLight(cyanColor, 3.5, 450);
    cursorLight.position.set(0, 0, 150);
    scene.add(cursorLight);

    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    // 1. Floating 3D Geometric Shards (Cubes, Octahedrons, Icosahedrons, Torus)
    const shardsGroup = new THREE.Group();
    const shardMeshes: {
      mesh: THREE.Mesh | THREE.LineSegments;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      initialPos: THREE.Vector3;
      floatPhase: number;
    }[] = [];

    const shardGeometries = [
      new THREE.OctahedronGeometry(12, 0),
      new THREE.IcosahedronGeometry(10, 0),
      new THREE.TetrahedronGeometry(11, 0),
      new THREE.TorusGeometry(10, 2.5, 8, 20),
    ];

    const shardMaterial = new THREE.MeshStandardMaterial({
      color: tealColor,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: wireframeMode,
      transparent: true,
      opacity: 0.45,
      emissive: new THREE.Color(0x003344),
      emissiveIntensity: 0.6,
    });

    for (let i = 0; i < shardCount; i++) {
      const geo = shardGeometries[i % shardGeometries.length];
      const mesh = new THREE.Mesh(geo, shardMaterial.clone());

      const spreadX = isMobile ? 300 : 700;
      const spreadY = isMobile ? 500 : 900;
      const spreadZ = 300;

      const posX = (Math.random() - 0.5) * spreadX;
      const posY = (Math.random() - 0.5) * spreadY;
      const posZ = (Math.random() - 0.5) * spreadZ - 50;

      mesh.position.set(posX, posY, posZ);
      mesh.scale.setScalar(0.7 + Math.random() * 0.9);

      shardsGroup.add(mesh);
      shardMeshes.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        initialPos: new THREE.Vector3(posX, posY, posZ),
        floatPhase: Math.random() * Math.PI * 2,
      });
    }
    scene.add(shardsGroup);

    // 2. 3D Particle Cloud (Starfield & Constellations)
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    const pSpreadX = isMobile ? 380 : 850;
    const pSpreadY = isMobile ? 600 : 1200;
    const pSpreadZ = 450;

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * pSpreadX;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * pSpreadY;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * pSpreadZ - 80;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.18,
        y: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.12,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Glowing circle dot texture
    const dotCanvas = document.createElement("canvas");
    dotCanvas.width = 16;
    dotCanvas.height = 16;
    const dotCtx = dotCanvas.getContext("2d");
    if (dotCtx) {
      const grad = dotCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, "rgba(0, 229, 255, 1)");
      grad.addColorStop(0.3, "rgba(0, 168, 150, 0.8)");
      grad.addColorStop(1, "rgba(0, 168, 150, 0)");
      dotCtx.fillStyle = grad;
      dotCtx.fillRect(0, 0, 16, 16);
    }
    const dotTexture = new THREE.CanvasTexture(dotCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 3.5 : 5,
      map: dotTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Cyber Matrix Wireframe Horizon Plane at Bottom
    const gridHelper = new THREE.GridHelper(1200, 30, 0x00e5ff, 0x028090);
    gridHelper.position.y = -350;
    gridHelper.position.z = -100;
    gridHelper.rotation.x = 0.2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.18;
    scene.add(gridHelper);

    // Mouse Tracking & Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetMouseX = (e.clientX - halfW) / halfW;
      targetMouseY = -(e.clientY - halfH) / halfH;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Scroll-Linked Camera Parallax
    let scrollY = 0;
    let targetScrollY = 0;

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      targetScrollY = window.pageYOffset / maxScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Global Shockwave trigger on click
    let shockwaveProgress = 1; // 1 = inactive
    const handleShockwave = () => {
      shockwaveProgress = 0;
    };
    window.addEventListener("portfolio-3d-shockwave", handleShockwave);

    // Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Visibility Listener
    let isPageVisible = true;
    let animationFrameId: number | null = null;

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !animationFrameId) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isPageVisible) {
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;
      scrollY += (targetScrollY - scrollY) * 0.05;

      // Update Cursor Light in 3D Space
      cursorLight.position.x = mouseX * 250;
      cursorLight.position.y = mouseY * 180;

      // Shockwave expansion animation
      if (shockwaveProgress < 1) {
        shockwaveProgress += delta * 1.5;
        const waveScale = Math.sin(shockwaveProgress * Math.PI) * 40;
        camera.position.z = 300 + waveScale;
      } else {
        camera.position.z = 300;
      }

      // Camera Parallax
      camera.position.x = mouseX * 30;
      camera.position.y = mouseY * 25 - scrollY * 120;
      camera.lookAt(0, -scrollY * 120, 0);

      // Rotate Shards
      shardMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX * particleSpeed;
        item.mesh.rotation.y += item.rotSpeedY * particleSpeed;
        item.mesh.rotation.z += item.rotSpeedZ * particleSpeed;

        // Floating hover sine wave
        item.mesh.position.y =
          item.initialPos.y +
          Math.sin(elapsed * 0.8 + item.floatPhase) * 16 -
          scrollY * 80;
        item.mesh.position.x =
          item.initialPos.x +
          Math.cos(elapsed * 0.6 + item.floatPhase) * 8 +
          mouseX * 15;
      });

      // Update Particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      const halfX = pSpreadX / 2;
      const halfY = pSpreadY / 2;
      const halfZ = pSpreadZ / 2;

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x * particleSpeed;
        positions[i * 3 + 1] += particleVelocities[i].y * particleSpeed;
        positions[i * 3 + 2] += particleVelocities[i].z * particleSpeed;

        if (positions[i * 3] < -halfX || positions[i * 3] > halfX) {
          particleVelocities[i].x = -particleVelocities[i].x;
        }
        if (positions[i * 3 + 1] < -halfY || positions[i * 3 + 1] > halfY) {
          particleVelocities[i].y = -particleVelocities[i].y;
        }
        if (positions[i * 3 + 2] < -halfZ || positions[i * 3 + 2] > halfZ) {
          particleVelocities[i].z = -particleVelocities[i].z;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Animate Matrix Grid horizon
      gridHelper.position.z = -100 + ((elapsed * 25 * particleSpeed) % 40);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("portfolio-3d-shockwave", handleShockwave);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      shardGeometries.forEach((g) => g.dispose());
      shardMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      dotTexture.dispose();
      renderer.dispose();
    };
  }, [particleSpeed, wireframeMode]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        opacity: 0.85,
        maskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 95%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 95%)",
      }}
      aria-hidden="true"
    />
  );
};

export default Global3DCanvas;
