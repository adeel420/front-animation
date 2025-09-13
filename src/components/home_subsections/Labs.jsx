import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import Gallery from "../Gallery";
import { assets } from "../../assets/assets";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 text-lg font-medium rounded-full transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default function Labs() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const galleryRef = useRef();

  // Scroll Lock effect
  useEffect(() => {
    if (!showGallery || !scrollEnabled) {
      document.body.style.overflow = "hidden"; // Lock scroll for preview
    } else {
      document.body.style.overflow = "auto"; // Enable scroll after click
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGallery, scrollEnabled]);

  return (
    <div className="canvas-container min-h-screen bg-black text-white relative">
      {/* Canvas Preview / Gallery */}
      <div ref={galleryRef} className="relative z-10 h-screen">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Gallery
            scrollRef={galleryRef}
            setScrollEnabled={setScrollEnabled}
            preview={!showGallery} // Preview mode
          />
          <EffectComposer>
            <DepthOfField
              focusDistance={0.3}
              focalLength={0.02}
              bokehScale={2}
            />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Button */}
      {!showGallery && (
        <div className="absolute bottom-20 w-full flex justify-center z-10">
          <Button onClick={() => setShowGallery(true)}>프로젝트 안내소</Button>
        </div>
      )}

      {/* Reduced scroll height for smoother transition */}
      {showGallery && <div className="h-[80vh]" />}
    </div>
  );
}
