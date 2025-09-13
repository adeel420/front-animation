import React, { Suspense, useRef } from "react";
import { Image, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { assets } from "../assets/assets";

const images = [
  assets.land,
  assets.laptop,
  assets.nature,
  assets.sea,
  assets.work,
];

export default function Gallery({ scrollRef, setScrollEnabled }) {
  const group = useRef();
  const targetZ = useRef(0);
  const currentZ = useRef(0);

  const cols = 3;
  const rows = 4;
  const depth = 8;

  const items = [];
  let i = 0;
  for (let z = 0; z < depth; z++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const src = images[i % images.length];
        items.push({
          src,
          x: (x - cols / 2) * 2.5 + (Math.random() - 0.5) * 0.8,
          y: (y - rows / 1.3) * 2 + (Math.random() - 0.5) * 0.8,
          z: -z * 3 + (Math.random() - 0.5) * 0.5,
        });
        i++;
      }
    }
  }

  useFrame(() => {
    if (!scrollRef.current || !group.current) return;

    const rect = scrollRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 0;
    if (rect.top <= 0 && rect.bottom > windowHeight) {
      progress = Math.abs(rect.top) / (rect.height - windowHeight);
      setScrollEnabled(false); // Lock scroll while images scroll
    } else if (rect.bottom <= windowHeight) {
      progress = 1;
      setScrollEnabled(true); // Unlock scroll when images end
    }

    targetZ.current = progress * depth * 3;
    currentZ.current += (targetZ.current - currentZ.current) * 0.1;
    group.current.position.z = currentZ.current;
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
            radius={0.2}
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
