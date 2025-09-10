import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

import baseVert from "../shaders/base.vert?raw";
import outputFrag from "../shaders/output.frag?raw";

function Droplets() {
  const meshRef = useRef();
  const trailLength = 15;
  const pointerTrail = useRef(
    Array.from({ length: trailLength }, () => new THREE.Vector2(0, 0))
  );

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
    const handleMove = (e) => {
      for (let i = trailLength - 1; i > 0; i--) {
        pointerTrail.current[i].copy(pointerTrail.current[i - 1]);
      }
      pointerTrail.current[0].set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      uniforms.uTime.value = clock.getElapsedTime();
    }
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
    <Canvas>
      <Droplets />
    </Canvas>
  );
}
