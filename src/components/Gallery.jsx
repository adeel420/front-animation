import React, { Suspense, useRef, useState, useEffect } from "react";
import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { assets } from "../assets/assets";

export default function Gallery({
  scrollRef,
  setScrollEnabled,
  preview = false,
}) {
  const group = useRef();
  const targetZ = useRef(0);
  const currentZ = useRef(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const cols = 3;
  const rows = 4;
  const depth = 6; // Reduced depth for smoother animation

  const images = [
    assets.land,
    assets.laptop,
    assets.nature,
    assets.sea,
    assets.work,
  ];

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
          z: -z * 2.5 + (Math.random() - 0.5) * 0.5, // Reduced spacing
        });
        i++;
      }
    }
  }

  // Detect when user starts scrolling
  useEffect(() => {
    if (!preview) {
      const handleScroll = () => {
        if (!hasScrolled) {
          setHasScrolled(true);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [preview, hasScrolled]);

  useFrame(() => {
    if (!group.current) return;

    let progress = 0;

    if (!preview && scrollRef.current && hasScrolled) {
      // Improved scroll calculation for smoother transition
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // More precise progress calculation
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        const scrollableDistance = elementHeight - windowHeight;
        progress = Math.min(Math.abs(rect.top) / scrollableDistance, 1);

        // Only disable scroll if animation is not complete
        if (progress < 0.95) {
          setScrollEnabled(false);
        } else {
          // Animation nearly complete, enable scroll for next sections
          setScrollEnabled(true);
        }
      } else if (rect.bottom <= windowHeight) {
        progress = 1;
        setScrollEnabled(true);
      } else if (rect.top > 0) {
        // User scrolled back up
        progress = 0;
        setScrollEnabled(false);
      }
    }

    // Smoother animation with adjusted multiplier
    targetZ.current = progress * depth * 2.5;
    currentZ.current += (targetZ.current - currentZ.current) * 0.08; // Slightly slower for smoothness
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
      </Suspense>
    </group>
  );
}
