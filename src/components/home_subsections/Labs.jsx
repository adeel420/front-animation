import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import Gallery from "../Gallery";

export default function Labs() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const galleryRef = useRef();

  // ✅ Memoized canvas settings (so Canvas doesn't re-render unnecessarily)
  const canvasSettings = useMemo(
    () => ({
      camera: { position: [0, 0, 5], fov: 50 },
      dpr: [1, 1.5], // lower DPR = performance boost
    }),
    []
  );

  // ✅ Scroll lock optimized
  useEffect(() => {
    document.body.style.overflow =
      showGallery && scrollEnabled ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGallery, scrollEnabled]);

  // ✅ Auto-start animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Start animation when 50% of section is visible
            setShowGallery(true);
          } else if (!entry.isIntersecting) {
            // Reset when section goes out of view
            setShowGallery(false);
            setScrollEnabled(false);
          }
        });
      },
      {
        threshold: [0, 0.5, 1], // Trigger at 0%, 50%, and 100% visibility
        rootMargin: "0px",
      }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <div className="canvas-container min-h-screen bg-black text-white relative">
      {/* ================= Canvas ================= */}
      <div ref={galleryRef} className="relative z-10 h-screen">
        <Canvas {...canvasSettings}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* ✅ Suspense → async load heavy assets */}
          <Suspense fallback={null}>
            <Gallery
              scrollRef={galleryRef}
              setScrollEnabled={setScrollEnabled}
              preview={!showGallery} // lighter preview
              reset={!showGallery} // reset when closed
            />
          </Suspense>

          {/* ✅ Postprocessing → only when gallery is open */}
          {showGallery && (
            <EffectComposer multisampling={0}>
              <DepthOfField
                focusDistance={0.3}
                focalLength={0.015}
                bokehScale={1.5}
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {/* ================= Scroll Placeholder ================= */}
      {showGallery && <div className="h-[0vh]" />}
    </div>
  );
}
