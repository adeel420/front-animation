import React, { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import Gallery from "../Gallery";
import { assets } from "../../assets/assets";

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

  // ✅ Scroll lock optimized
  useEffect(() => {
    document.body.style.overflow =
      showGallery && scrollEnabled ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGallery, scrollEnabled]);

  return (
    <div className="canvas-container min-h-screen bg-black text-white relative">
      {/* ================= Canvas ================= */}
      <div ref={galleryRef} className="relative z-10 h-screen">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]} // ✅ Lower DPR for performance boost
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* ✅ Suspense se heavy assets async load honge */}
          <Suspense fallback={null}>
            <Gallery
              scrollRef={galleryRef}
              setScrollEnabled={setScrollEnabled}
              preview={!showGallery} // Preview me lighter logic
            />
          </Suspense>

          {/* ✅ Postprocessing ko optional rakha (sirf gallery me) */}
          {showGallery && (
            <EffectComposer multisampling={0}>
              <DepthOfField
                focusDistance={0.3}
                focalLength={0.015} // thoda lighter
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
      {showGallery && <div className="h-[60vh]" />}
    </div>
  );
}
