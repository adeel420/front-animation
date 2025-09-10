import React, { useEffect, useRef } from "react";
import DarkVeil from "../../animations/DarkVeil";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData } from "../../data/Data";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const wiseRef = useRef(null);
  const rootreeRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const updateAnimations = () => {
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const isMobile = ww < 640;

      // Mobile-friendly spacing - add proper gap between words
      const spacing = isMobile ? 85 : 250;

      gsap.set([wiseRef.current, rootreeRef.current], { clearProps: "all" });

      // Initial positions - single line on mobile
      gsap.set(wiseRef.current, {
        x: -spacing / 2,
        y: 0, // same line for mobile and desktop
        fontSize: isMobile ? "1.8rem" : "5rem",
      });
      gsap.set(rootreeRef.current, {
        x: spacing / 2,
        y: 0, // same line for mobile and desktop
        fontSize: isMobile ? "1.8rem" : "5rem",
      });

      // Timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3, // smooth scroll scrub
          pin: true,
        },
      });

      scrollTl
        // Stage 1: WISE + ROOTREE
        .to(wiseRef.current, {
          x: isMobile ? -ww / 2 + 40 : -ww / 2 + 40,
          y: isMobile ? -wh / 2 + 80 : -wh / 2 + 80,
          fontSize: isMobile ? "1rem" : "2rem",
          duration: 16, // was 2 → now 8x slower
          ease: "power2.out",
        })
        .to(
          rootreeRef.current,
          {
            x: isMobile ? ww / 2 - 120 : ww / 2 - 200,
            y: isMobile ? wh / 2 - 80 : wh / 2 - 100,
            fontSize: isMobile ? "1rem" : "2rem",
            duration: 16, // was 2 → now 8x slower
            ease: "power2.out",
          },
          "<"
        )
        // Stage 2: Heading - Made smoother with power1.out ease
        .to(headingRef.current, { opacity: 1, duration: 5 }) // thoda visible rakha
        .fromTo(
          headingRef.current,
          { x: ww },
          { x: 0, duration: 24, ease: "power1.out" } // changed to power1.out for smoother movement
        )
        .to(headingRef.current, { x: -ww, duration: 24, ease: "power1.out" }) // added smooth ease
        // Stage 3: Cards - Made 5 times slower with smooth easing
        .fromTo(
          cardsRef.current,
          { x: ww },
          { x: 0, duration: 120, ease: "power1.out" }
        ) // added smooth ease
        .to(cardsRef.current, {
          x: -ww * 0.4,
          duration: 120,
          ease: "power1.out",
        }) // added smooth ease
        .to(cardsRef.current, {
          x: -ww * 0.8,
          duration: 120,
          ease: "power1.out",
        }) // added smooth ease
        .to(cardsRef.current, {
          x: -ww * 1.2,
          duration: 120,
          ease: "power1.out",
        }); // added smooth ease
    };

    updateAnimations();

    // Refresh on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      updateAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: "300vh" }} // increased from 120vh to 300vh for more scroll distance
    >
      <div className="sticky top-0 h-screen flex items-center justify-center text-white bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <DarkVeil />
        </div>

        {/* Stage 1: WISE + ROOTREE - Better mobile positioning */}
        <div
          className="absolute font-bold text-center"
          style={{ fontFamily: "Abril Fatface" }}
        >
          <div
            ref={wiseRef}
            className="absolute text-2xl sm:text-5xl md:text-7xl lg:text-8xl"
          >
            WISE
          </div>
          <div
            ref={rootreeRef}
            className="absolute text-2xl sm:text-5xl md:text-7xl lg:text-8xl"
          >
            ROOTREE
          </div>
        </div>

        {/* Stage 2: Heading */}
        <h1
          ref={headingRef}
          className="absolute font-bold opacity-0 whitespace-nowrap 
                 text-lg sm:text-3xl md:text-5xl lg:text-6xl 
                 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          Projects of Projects
        </h1>

        {/* Stage 3: Cards */}
        <div
          ref={cardsRef}
          className="absolute flex items-center justify-start gap-3 sm:gap-6 md:gap-8 
                 top-1/2 left-0 transform -translate-y-1/2 px-2 sm:px-4"
          style={{
            width: `${
              cardsData.length * (window.innerWidth < 640 ? 55 : 70)
            }vw`,
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="project-card rounded-2xl p-3 sm:p-4 shadow-lg 
                     h-[240px] w-[260px] sm:h-[220px] sm:w-[240px] 
                     md:h-[260px] md:w-[300px] 
                     lg:h-[300px] lg:w-[360px] 
                     bg-gray-800 flex-shrink-0"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-white text-xs sm:text-base md:text-lg lg:text-xl">
                  Project {index + 1}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
