import React, { Suspense, useRef } from "react";
import { Image, Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { assets } from "../assets/assets";

const images = [
  assets.land,
  assets.laptop,
  assets.nature,
  assets.sea,
  assets.work,
];

export default function Gallery() {
  const group = useRef();
  const scroll = useScroll();

  // Grid with jitter
  const cols = 3;
  const rows = 4;
  const depth = 8; // how deep grid goes

  const items = [];
  let i = 0;
  for (let z = 0; z < depth; z++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const src = images[i % images.length];
        items.push({
          src,
          x: (x - cols / 2) * 2.5 + (Math.random() - 0.5) * 0.8, // jittered grid
          y: (y - rows / 1.3) * 2 + (Math.random() - 0.5) * 0.8,
          z: -z * 3 + (Math.random() - 0.5) * 0.5, // depth with slight randomness
        });
        i++;
      }
    }
  }

  // Animate instantly with scroll
  useFrame(() => {
    if (group.current) {
      const t = scroll.offset;
      group.current.position.z = t * depth * 3; // move through grid
    }
  });

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        {items.map((item, i) => (
          <Image
            key={i}
            url={item.src}
            position={[item.x, item.y, item.z]}
            scale={[1.5, 1, 1]}
            radius={0.2} // rounded corners
          />
        ))}

        <Text
          position={[0, -3, 2]}
          fontSize={1}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Embrace now,
        </Text>
      </Suspense>
    </group>
  );
}
