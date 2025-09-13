import React, { Suspense, useRef, useState, useEffect, useMemo } from "react";
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
  const depth = 6;
  const images = [
    assets.land,
    assets.laptop,
    assets.nature,
    assets.sea,
    assets.work,
  ];

  // ✅ Memoize items so they don't regenerate every render
  const items = useMemo(() => {
    const temp = [];
    let i = 0;
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const src = images[i % images.length];
          temp.push({
            src,
            x: (x - cols / 2) * 2.5 + (Math.random() - 0.5) * 0.5, // less randomness → smoother
            y: (y - rows / 1.3) * 2 + (Math.random() - 0.5) * 0.5,
            z: -z * 2.5,
          });
          i++;
        }
      }
    }
    return temp;
  }, [cols, rows, depth, images]);

  // ✅ Scroll detection
  useEffect(() => {
    if (preview) return;

    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [preview, hasScrolled]);

  useFrame(() => {
    if (!group.current) return;

    let progress = 0;

    if (!preview && scrollRef.current && hasScrolled) {
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      if (rect.top <= 0 && rect.bottom > windowHeight) {
        const scrollableDistance = elementHeight - windowHeight;
        progress = Math.min(Math.abs(rect.top) / scrollableDistance, 1);
        setScrollEnabled(progress >= 0.95);
      } else if (rect.bottom <= windowHeight) {
        progress = 1;
        setScrollEnabled(true);
      } else if (rect.top > 0) {
        progress = 0;
        setScrollEnabled(false);
      }
    }

    // ✅ Smooth LERP animation
    targetZ.current = progress * depth * 2.5;
    currentZ.current += (targetZ.current - currentZ.current) * 0.05;
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
            scale={[1.2, 0.8, 1]} // smaller → faster rendering
          />
        ))}
      </Suspense>
    </group>
  );
}
