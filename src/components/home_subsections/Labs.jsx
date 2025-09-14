import React, { useState, useRef, useEffect, Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import Gallery from "../Gallery";

// ✅ Reusable button
const Button = ({ children, className, ...props }) => (
  <button
    {...props}
    className={`bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

export default function Labs() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const galleryRef = useRef();

  // ✅ Memoized canvas settings (so Canvas doesn’t re-render unnecessarily)
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

  // ✅ Reset when section goes out of view
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;

      const rect = galleryRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setShowGallery(false);
        setScrollEnabled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* ================= Button ================= */}
      {!showGallery && (
        <div className="absolute bottom-20 w-full flex justify-center z-10">
          <Button onClick={() => setShowGallery(true)}>프로젝트 안내소</Button>
        </div>
      )}

      {/* ================= Scroll Placeholder ================= */}
      {showGallery && <div className="h-[0vh]" />}
    </div>
  );
}
