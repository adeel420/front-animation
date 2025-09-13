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

const FloatingImage = ({ src, alt, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`absolute transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      <div className="relative group cursor-pointer">
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default function Labs() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const galleryRef = useRef();

  // Scroll Lock effect
  useEffect(() => {
    if (showGallery) {
      document.body.style.overflow = scrollEnabled ? "auto" : "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGallery, scrollEnabled]);

  return (
    <div className="canvas-container min-h-screen bg-black text-white relative">
      {/* Floating Images */}
      {!showGallery && (
        <>
          <FloatingImage
            src={assets.art}
            alt="Art"
            className="top-20 left-10 w-72 h-48 rotate-[-8deg]"
            delay={200}
          />
          <FloatingImage
            src={assets.work}
            alt="Workspace"
            className="top-32 right-20 w-48 h-36 rotate-[12deg]"
            delay={400}
          />
          <FloatingImage
            src={assets.land}
            alt="Digital Art"
            className="top-60 left-32 w-60 h-44 rotate-[-15deg]"
            delay={600}
          />
          <FloatingImage
            src={assets.landscape}
            alt="Landscape"
            className="bottom-40 right-10 w-56 h-40 rotate-[8deg]"
            delay={800}
          />
          <FloatingImage
            src={assets.laptop}
            alt="Laptop"
            className="bottom-60 left-20 w-44 h-32 rotate-[-10deg]"
            delay={1000}
          />
          <FloatingImage
            src={assets.nature}
            alt="Nature"
            className="top-80 right-40 w-40 h-28 rotate-[15deg]"
            delay={1200}
          />
          <FloatingImage
            src={assets.sea}
            alt="Sea"
            className="bottom-20 left-60 w-68 h-46 rotate-[-5deg]"
            delay={1400}
          />
          <FloatingImage
            src={assets.mountain}
            alt="Mountain"
            className="top-40 left-80 w-42 h-30 rotate-[20deg]"
            delay={1600}
          />
          <FloatingImage
            src={assets.cap}
            alt="Cap"
            className="bottom-80 right-60 w-58 h-42 rotate-[-12deg]"
            delay={1800}
          />
        </>
      )}

      {/* Main Section */}
      {!showGallery && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              301lab의 역사
            </h1>
            <div className="space-y-2 text-gray-300">
              <p className="text-xl md:text-2xl font-medium">24년을 함께하다</p>
              <p className="text-lg md:text-xl">우리의 작업</p>
            </div>
            <div className="pt-8">
              <Button onClick={() => setShowGallery(true)}>
                프로젝트 안내소
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {showGallery && (
        <div ref={galleryRef} className="relative z-10 h-[300vh]">
          <div className="sticky top-0 h-screen">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Gallery
                scrollRef={galleryRef}
                setScrollEnabled={setScrollEnabled}
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
        </div>
      )}
    </div>
  );
}
