import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import baseVert from "../shaders/base.vert?raw";
import outputFrag from "../shaders/output.frag?raw";

function Droplets() {
  const meshRef = useRef();
  const trailLength = 15;

  // ✅ GPU-friendly Float32Array
  const pointerTrail = useRef(new Float32Array(trailLength * 2));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uPointerTrail: { value: pointerTrail.current },
      uDropWidth: { value: 0.6 }, // 👈 increased width even more for wider droplets
    }),
    []
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      uniforms.uResolution.value.set(width, height);

      // Scale plane to maintain aspect ratio
      if (meshRef.current) {
        const aspect = width / height;
        meshRef.current.scale.set(aspect, 3, 3);
      }
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniforms]);

  // ✅ Pointer move → update Float32Array
  useEffect(() => {
    const handleMove = (e) => {
      for (let i = trailLength - 1; i > 0; i--) {
        pointerTrail.current[i * 2] = pointerTrail.current[(i - 1) * 2];
        pointerTrail.current[i * 2 + 1] = pointerTrail.current[(i - 1) * 2 + 1];
      }
      pointerTrail.current[0] = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTrail.current[1] = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollNorm =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      pointerTrail.current[1] = 1 - scrollNorm * 2; // -1 to 1 in clip space
      pointerTrail.current[0] = 0; // center horizontally
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Animate only uTime
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3]} />
      <rawShaderMaterial
        uniforms={uniforms}
        vertexShader={baseVert}
        fragmentShader={outputFrag}
      />
    </mesh>
  );
}

export default function DropletCanvas() {
  const canvasRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ Mobile scroll follow effect
  useEffect(() => {
    if (!isMobile || !canvasRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      const creativitySection =
        document.querySelector('[class*="Creativity"]') ||
        document.querySelector('[data-section="creativity"]');
      const cardsSection =
        document.querySelector('[class*="Cards"]') ||
        document.querySelector('[data-section="cards"]');
      const visionSection =
        document.querySelector('[class*="Vision"]') ||
        document.querySelector('[data-section="vision"]');

      let shouldShow = false;
      let sectionStart = 0;
      let sectionEnd = 0;

      [creativitySection, cardsSection, visionSection].forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = scrollY + rect.top;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (
            scrollY >= sectionTop - windowHeight &&
            scrollY <= sectionBottom
          ) {
            shouldShow = true;
            sectionStart = Math.max(sectionStart, sectionTop - windowHeight);
            sectionEnd = Math.max(sectionEnd, sectionBottom);
          }
        }
      });

      if (!shouldShow) {
        canvasRef.current.style.opacity = "0";
        return;
      }

      canvasRef.current.style.opacity = "1";

      const totalSectionHeight = sectionEnd - sectionStart;
      const currentPosition = scrollY - sectionStart;
      const scrollPercent = Math.min(
        Math.max(currentPosition / totalSectionHeight, 0),
        1
      );

      const translateY = scrollPercent * windowHeight * 0.4;

      // ✅ Centered on mobile
      canvasRef.current.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <div
      ref={canvasRef}
      style={{
        position: isMobile ? "fixed" : "absolute", // ✅ desktop pe bhi absolute
        top: isMobile ? "30%" : "0",
        left: isMobile ? "60%" : "0",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: isMobile ? -5 : 0, // ✅ desktop pe normal layering
        opacity: isMobile ? 0 : 1, // ✅ desktop pe always visible
        transition: isMobile ? "opacity 0.3s ease" : "none",
        transform: isMobile ? "translate(-50%, -50%)" : "none",
      }}
    >
      <Canvas
        gl={{
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <Droplets />
      </Canvas>
    </div>
  );
}
