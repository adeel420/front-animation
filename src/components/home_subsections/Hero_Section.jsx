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

  const { ww, wh, isMobile } = useMemo(() => {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const isMobile = ww < 640;
    return { ww, wh, isMobile };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(wiseRef.current, {
      x: isMobile ? -ww / 2 + 100 : -ww / 2 + 200,
      y: isMobile ? -wh / 2 + 100 : -wh / 2 + 120,
      fontSize: isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
      duration: 1.2,
      ease: "power3.out",
    });

    tl.to(
      rootreeRef.current,
      {
        x: isMobile ? ww / 2 - 100 : ww < 1024 ? ww / 2 - 150 : ww / 2 - 200,
        y: isMobile ? wh / 2 - 60 : ww < 1024 ? wh / 2 - 80 : wh / 2 - 100,
        fontSize: isMobile ? "0.9rem" : ww < 1024 ? "1.2rem" : "2rem",
        duration: 1.2,
        ease: "power3.out",
      },
      "<"
    );

    tl.to(
      [yearRef.current, textRef.current],
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    tl.fromTo(
      wrapperRef.current.children,
      {
        x: "100vw",
        opacity: 0,
        scale: 0.8,
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.3"
    );

    tl.to(
      wrapperRef.current,
      {
        x: 0,
        duration: 0.1,
        ease: "none",
      },
      "-=0.1"
    );
  }, [isMobile, ww, wh]);

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: true,
      touchMultiplier: 1.2,
      infinite: false,
    });

    let lastProgress = 0;

    const handleScroll = (e) => {
      const scrolled = e.scroll;
      const totalHeight = wh * 3;
      const progress = Math.min(scrolled / totalHeight, 1);

      const cardWidth = wrapperRef.current?.children[0]?.offsetWidth || 0;
      const gap = 24;
      const totalCardsWidth = (cardWidth + gap) * 8;
      const maxScroll = Math.max(0, totalCardsWidth - ww + gap + cardWidth);

      if (progress > 0.2 && progress <= 0.85) {
        const stageProgress = (progress - 0.2) / 0.65;
        const targetX = -gsap.utils.interpolate(0, maxScroll, stageProgress);

        gsap.to(wrapperRef.current, {
          x: targetX,
          duration: 0.2,
          ease: "power2.out",
        });

        // ✅ reset Y position while scrolling in stage
        gsap.to(containerRef.current, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      } else if (progress <= 0.2) {
        const reverseProgress = progress / 0.2;
        gsap.to(wrapperRef.current, {
          x: gsap.utils.interpolate(0, 0, reverseProgress),
          duration: 0.3,
          ease: "power2.out",
        });

        // ✅ reset Y when at top area
        gsap.to(containerRef.current, {
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        });
      } else if (progress > 0.85) {
        const exitProgress = (progress - 0.85) / 0.15;
        const smoothExit = gsap.utils.interpolate(0, 1, exitProgress);

        gsap.to(containerRef.current, {
          y: -wh * smoothExit,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    };

    lenisRef.current.on("scroll", handleScroll);

    function animate() {
      lenisRef.current.raf(performance.now());
      requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      lenisRef.current.resize();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      lenisRef.current.destroy();
      window.removeEventListener("resize", handleResize);
    };
  }, [ww, wh]);

  return (
    <div style={{ height: "400vh" }}>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
      >
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

        <div
          className="absolute inset-0 flex items-center justify-center font-bold text-white text-center"
          style={{ fontFamily: "Abril Fatface, cursive" }}
        >
          <div className="flex items-center gap-6 sm:gap-10 md:gap-16 lg:gap-20">
            <div
              ref={wiseRef}
              className="text-xl sm:text-4xl md:text-6xl lg:text-8xl"
            >
              WISE
            </div>
            <div
              ref={rootreeRef}
              className="text-xl sm:text-4xl md:text-6xl lg:text-8xl"
            >
              ROOTREE
            </div>
          </div>
        </div>

        <div
          ref={textRef}
          className="text-white absolute top-[55%] left-[47%] text-xs sm:top-[57%] sm:left-[47%] md:top-[57%] md:left-[47%] md:text-sm lg:left-[48%] lg:top-[60%] lg:text-lg xl:text-xl 2xl:text-2xl"
        >
          <p>A business partner who will make your vision come true</p>
          <p>Create it with us</p>
        </div>

        <div
          ref={wrapperRef}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-screen px-4 sm:px-8 z-10"
          style={{ width: "max-content", opacity: 1 }}
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
