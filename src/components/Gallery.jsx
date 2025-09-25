import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { assets } from "../assets/assets";

export default function Gallery({
  scrollRef,
  setScrollEnabled,
  preview = false,
  reset = false,
}) {
  const group = useRef();
  const targetZ = useRef(0);
  const currentZ = useRef(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollEnabled = useRef(false); // ✅ track previous value

  const cols = 4;
  const rows = 4;
  const depth = 6;

  // ✅ Memoize images array so it doesn’t recreate every render
  const images = useMemo(
    () => [assets.land, assets.laptop, assets.nature, assets.sea, assets.work],
    []
  );

  // ✅ Reset gallery position synchronously
  useLayoutEffect(() => {
    if (reset && group.current) {
      targetZ.current = 0;
      currentZ.current = 0;
      setHasScrolled(false);
      group.current.position.z = 0;
    }
  }, [reset]);

  // ✅ Memoize items (grid of images)
  // const items = useMemo(() => {
  //   const temp = [];
  //   let i = 0;
  //   for (let z = 0; z < depth; z++) {
  //     for (let y = 0; y < rows; y++) {
  //       for (let x = 0; x < cols; x++) {
  //         const src = images[i % images.length];
  //         temp.push({
  //           src,
  //           x: (x - cols / 2) * 2.5 + (Math.random() - 0.5) * 0.4,
  //           y: (y - rows / 1.3) * 2 + (Math.random() - 0.5) * 0.4,
  //           z: -z * 2.5,
  //         });
  //         i++;
  //       }
  //     }
  //   }
  //   return temp;
  // }, [cols, rows, depth, images]);

  // ✅ Scroll detection
  useEffect(() => {
    if (preview) return;
    const handleScroll = () => {
      if (!hasScrolled) setHasScrolled(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [preview, hasScrolled]);

  const items = useMemo(() => {
    const temp = [];
    let i = 0;
    for (let z = 0; z < depth; z++) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const src = images[i % images.length];
          temp.push({
            src,
            x: (x - cols / 2) * 3.5 + (Math.random() - 0.5) * 0.2,
            y: (y - rows / 1.3) * 2.5 + (Math.random() - 0.5) * 0.2,
            z: -z * 3.5,
          });
          i++;
        }
      }
    }
    return temp;
  }, [cols, rows, depth, images]);

  useFrame(() => {
    if (!group.current) return;

    let progress = 0;
    if (!preview && scrollRef.current && hasScrolled) {
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      const scrollableDistance = elementHeight - windowHeight;

      if (rect.top <= 0 && rect.bottom > windowHeight) {
        progress = Math.min(Math.abs(rect.top) / scrollableDistance, 1);
      } else if (rect.bottom <= windowHeight) {
        progress = 1;
      }
    }

    targetZ.current = progress * depth * 3.5;
    const diff = targetZ.current - currentZ.current;

    // 🔹 Skip tiny updates for perf
    if (Math.abs(diff) > 0.001) {
      currentZ.current += diff * 0.005;
      group.current.position.z = currentZ.current;
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
            scale={[1.2, 0.8, 1]} // ✅ keep small for performance
            frustumCulled
            toneMapped={false}
          />
        ))}
      </Suspense>
    </group>
  );
}
