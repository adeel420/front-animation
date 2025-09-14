import React, { useEffect, useRef, useMemo } from "react";
import DarkVeil from "../../animations/DarkVeil";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const wiseRef = useRef(null);
  const rootreeRef = useRef(null);
  const wrapperRef = useRef(null);

  // ✅ Window width/height aur spacing ko memoize kar do
  const { ww, wh, isMobile, spacing, fontSize } = useMemo(() => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const isMobile = ww < 640;
    const spacing = isMobile ? 100 : ww < 1024 ? 200 : 350;
    const fontSize = isMobile ? "1.5rem" : ww < 1024 ? "3rem" : "5rem";

    return { ww, wh, isMobile, spacing, fontSize };
  }, []); // 👈 dependency [] means ye sirf 1 dafa calculate hoga

  useEffect(() => {
    // Reset
    gsap.set([wiseRef.current, rootreeRef.current], { clearProps: "all" });

    // Initial positions
    gsap.set(wiseRef.current, {
      x: -spacing / 2,
      y: 0,
      fontSize,
    });
    gsap.set(rootreeRef.current, {
      x: spacing / 2,
      y: 0,
      fontSize,
    });

    // Horizontal scrolling total width
    const totalWidth = wrapperRef.current.scrollWidth;

    // Master timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + (totalWidth + 1000),
        scrub: 1,
        pin: true,
      },
    });

    // Stage 1: WISE + ROOTREE move to corners
    tl.to(wiseRef.current, {
      x: isMobile ? -ww / 2 + 60 : ww < 1024 ? -ww / 2 + 70 : -ww / 2 + 80,
      y: isMobile ? -wh / 2 + 100 : ww < 1024 ? -wh / 2 + 120 : -wh / 2 + 120,
      fontSize: isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
      duration: 2,
      ease: "power2.out",
    }).to(
      rootreeRef.current,
      {
        x: isMobile ? ww / 2 - 100 : ww < 1024 ? ww / 2 - 150 : ww / 2 - 200,
        y: isMobile ? wh / 2 - 60 : ww < 1024 ? wh / 2 - 80 : wh / 2 - 100,
        fontSize: isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
        duration: 2,
        ease: "power2.out",
      },
      "<"
    );

    // Initial off-screen position
    gsap.set(wrapperRef.current, {
      x: ww,
    });

    // Stage 2: Scroll them into view
    tl.to(wrapperRef.current, {
      x: -(totalWidth - ww),
      duration: 8,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, [spacing, fontSize, ww, wh, isMobile]); // ✅ dependencies memoized values

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <DarkVeil />
      </div>

      {/* WISE ROOTREE center */}
      <div
        className="absolute inset-0 flex items-center justify-center font-bold text-white text-center"
        style={{ fontFamily: "Abril Fatface" }}
      >
        <div
          ref={wiseRef}
          className="absolute text-xl sm:text-4xl md:text-6xl lg:text-8xl"
        >
          WISE
        </div>
        <div
          ref={rootreeRef}
          className="absolute text-xl sm:text-4xl md:text-6xl lg:text-8xl"
        >
          ROOTREE
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div
        ref={wrapperRef}
        className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-screen px-4 sm:px-8 z-10"
        style={{
          width: "max-content",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <section
            key={i}
            className="min-w-[250px] sm:min-w-[350px] md:min-w-[450px] lg:min-w-[500px] 
              h-[200px] sm:h-[250px] md:h-[300px] 
              flex items-center justify-center 
              bg-purple-400 text-white 
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
              font-bold rounded-xl shadow-lg"
          >
            Section {i + 1}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Hero;
