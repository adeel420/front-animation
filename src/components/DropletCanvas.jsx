import React, { useRef, useMemo, useEffect } from "react";
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
        meshRef.current.scale.set(aspect, 1, 1);
      }
    };
    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniforms]);

  // ✅ Pointer move → update Float32Array
  useEffect(() => {
    const handleMove = (e) => {
      // shift old values
      for (let i = trailLength - 1; i > 0; i--) {
        pointerTrail.current[i * 2] = pointerTrail.current[(i - 1) * 2];
        pointerTrail.current[i * 2 + 1] = pointerTrail.current[(i - 1) * 2 + 1];
      }
      // set new head
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
      <planeGeometry args={[2, 2]} />
      <rawShaderMaterial
        uniforms={uniforms}
        vertexShader={baseVert}
        fragmentShader={outputFrag}
      />
    </mesh>
  );
}

export default function DropletCanvas() {
  return (
    <Canvas
      gl={{
        antialias: false, // ✅ better performance
        powerPreference: "high-performance",
      }}
    >
      <Droplets />
    </Canvas>
  );
}
