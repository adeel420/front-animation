import React, { useEffect, useRef, useMemo } from "react";
import DarkVeil from "../../animations/DarkVeil";
import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

const Hero = () => {
  const containerRef = useRef(null);
  const wiseRef = useRef(null);
  const rootreeRef = useRef(null);
  const wrapperRef = useRef(null);
  const yearRef = useRef(null);
  const textRef = useRef(null);
  const lenisRef = useRef(null);

  const { ww, wh, isMobile, spacing, fontSize } = useMemo(() => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const isMobile = ww < 640;
    const spacing = isMobile ? 100 : ww < 1024 ? 200 : 350;
    const fontSize = isMobile ? "1.5rem" : ww < 1024 ? "3rem" : "5rem";

    return { ww, wh, isMobile, spacing, fontSize };
  }, []);

  useEffect(() => {
    // Initialize Lenis with slower settings for smoother experience
    lenisRef.current = new Lenis({
      duration: 2.5, // Increased from 1.2 for smoother scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8, // Reduced for slower scroll
      smoothTouch: false,
      touchMultiplier: 1.5, // Reduced for slower scroll
      infinite: false,
    });

    // Set initial positions
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
    gsap.set(wrapperRef.current, { x: ww });

    // Scroll event handler
    const handleScroll = (e) => {
      const scrolled = e.scroll;
      // 5x longer scroll height for slower animation
      const totalHeight = wh * 10; // Increased from wh * 2 to make it 5x slower
      const progress = Math.min(scrolled / totalHeight, 1);

      // Reset opacity when coming back to this section
      if (progress < 0.8) {
        gsap.set(containerRef.current, { opacity: 1 });
      }

      // Stage 1: Move WISE and ROOTREE to corners (0-30% progress)
      if (progress <= 0.3) {
        const stageProgress = progress / 0.3; // 0 to 1

        gsap.to(wiseRef.current, {
          x: gsap.utils.interpolate(
            -spacing / 2,
            isMobile ? -ww / 2 + 60 : ww < 1024 ? -ww / 2 + 70 : -ww / 2 + 80,
            stageProgress
          ),
          y: gsap.utils.interpolate(
            0,
            isMobile
              ? -wh / 2 + 100
              : ww < 1024
              ? -wh / 2 + 120
              : -wh / 2 + 120,
            stageProgress
          ),
          fontSize: gsap.utils.interpolate(
            fontSize,
            isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
            stageProgress
          ),
          duration: 0.2, // Slightly increased for smoother transitions
          ease: "power2.out", // Smoother easing
        });

        gsap.to(rootreeRef.current, {
          x: gsap.utils.interpolate(
            spacing / 2,
            isMobile ? ww / 2 - 100 : ww < 1024 ? ww / 2 - 150 : ww / 2 - 200,
            stageProgress
          ),
          y: gsap.utils.interpolate(
            0,
            isMobile ? wh / 2 - 60 : ww < 1024 ? wh / 2 - 80 : wh / 2 - 100,
            stageProgress
          ),
          fontSize: gsap.utils.interpolate(
            fontSize,
            isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
            stageProgress
          ),
          duration: 0.2, // Slightly increased for smoother transitions
          ease: "power2.out", // Smoother easing
        });

        // Fade out year and text
        gsap.to([yearRef.current, textRef.current], {
          opacity: 1 - stageProgress,
          duration: 0.2, // Slightly increased for smoother transitions
          ease: "power2.out", // Smoother easing
        });
      }

      // Stage 2: Horizontal scroll (30-80% progress)
      if (progress > 0.3 && progress <= 0.8) {
        const stageProgress = (progress - 0.3) / 0.5; // 0 to 1
        const totalWidth = wrapperRef.current?.scrollWidth || 0;

        gsap.to(wrapperRef.current, {
          x: gsap.utils.interpolate(ww, -(totalWidth - ww), stageProgress),
          duration: 0.2, // Slightly increased for smoother transitions
          ease: "power2.out", // Smoother easing
        });
      }

      // Stage 3: Hide entire section (80-100% progress)
      if (progress > 0.8) {
        const stageProgress = (progress - 0.8) / 0.2; // 0 to 1

        gsap.to(containerRef.current, {
          opacity: 1 - stageProgress,
          duration: 0.1, // Slightly increased for smoother transitions
          ease: "power2.out", // Smoother easing
        });
      }
    };

    // Add scroll listener
    lenisRef.current.on("scroll", handleScroll);

    // Animation loop
    function animate() {
      lenisRef.current.raf(performance.now());
      requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      lenisRef.current.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      lenisRef.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [spacing, fontSize, ww, wh, isMobile]);

  return (
    // 5x longer scroll height for slower animation
    <div style={{ height: "1250vh" }}>
      {" "}
      {/* Changed from 250vh to 1250vh (5x) */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <DarkVeil />
        </div>

        <p
          ref={yearRef}
          className="absolute text-white text-xs top-[42%] left-[30%] sm:top-[40%] sm:left-[25%] md:top-[40%] md:left-[29%] md:text-sm lg:left-[23%] lg:top-[38%] lg:text-lg xl:left-[28%] xl:text-xl 2xl:left-[32%] 2xl:text-2xl"
          style={{ fontFamily: "Noto Sans KR, sans-serif" }}
        >
          @2025
        </p>

        {/* WISE ROOTREE center */}
        <div
          className="absolute inset-0 flex items-center justify-center font-bold text-white text-center"
          style={{ fontFamily: "Abril Fatface, cursive" }}
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

        {/* Bottom text */}
        <div
          ref={textRef}
          className="text-white absolute top-[55%] left-[47%] text-xs sm:top-[57%] sm:left-[47%] md:top-[57%] md:left-[47%] md:text-sm lg:left-[48%] lg:top-[60%] lg:text-lg xl:text-xl 2xl:text-2xl"
        >
          <p>A business partner who will make your vision come true</p>
          <p>Create it with us</p>
        </div>

        {/* Horizontal Scroll Cards */}
        <div
          ref={wrapperRef}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-screen px-4 sm:px-8 z-10"
          style={{ width: "max-content" }}
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
    </div>
  );
};

export default Hero;
