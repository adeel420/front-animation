import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis(options = {}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // default scroll speed
      easing: (t) => 1 - Math.pow(1 - t, 3), // smooth cubic easing
      smoothWheel: true,
      smoothTouch: false,
      ...options, // ✅ allow customization from outside
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId); // ✅ cleanup RAF
      lenis.destroy(); // ✅ cleanup Lenis
    };
  }, [options]);
}
