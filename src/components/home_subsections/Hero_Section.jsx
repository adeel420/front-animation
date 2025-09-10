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
    // Set initial positions to center with spacing
    const spacing = 250; // space in pixels between WISE and ROOTREE
    gsap.set(wiseRef.current, {
      x: -spacing / 2,
      y: 0,
      fontSize: "5rem",
    });
    gsap.set(rootreeRef.current, {
      x: spacing / 2,
      y: 0,
      fontSize: "5rem",
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2.5, // Changed from 1 to 2.5 for slower response
        pin: true,
      },
    });

    scrollTl
      // Stage 1: WISE and ROOTREE animation (increased duration)
      .to(wiseRef.current, {
        x: -window.innerWidth / 2 + 50,
        y: -window.innerHeight / 2 + 100,
        fontSize: "2rem",
        duration: 2, // Increased from 1 to 2
        ease: "power2.out",
      })
      .to(
        rootreeRef.current,
        {
          x: window.innerWidth / 2 - 200,
          y: window.innerHeight / 2 - 100,
          fontSize: "2rem",
          duration: 2, // Increased from 1 to 2
          ease: "power2.out",
        },
        "<"
      )
      // Stage 2: Heading fade in and slide (increased duration)
      .to(headingRef.current, { opacity: 1, duration: 1 }) // Increased from 0.5 to 1
      .fromTo(
        headingRef.current,
        { x: window.innerWidth },
        { x: 0, duration: 2, ease: "power2.out" } // Increased from 1 to 2
      )
      // Stage 3: Heading out and cards appear (increased duration)
      .to(headingRef.current, { x: -window.innerWidth, duration: 2 }) // Increased from 1 to 2
      .to(cardsRef.current, { opacity: 1, duration: 0.2 }) // Increased from 0.1 to 0.2
      .to(cardsRef.current, { x: -400, duration: 2 }) // Increased from 1 to 2
      .to(cardsRef.current, { x: -800, duration: 2 }) // Increased from 1 to 2
      .to(cardsRef.current, { x: -1200, duration: 2 }); // Increased from 1 to 2
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ height: "250vh" }} // Increased from 170vh to 250vh for more scroll distance
    >
      <div className="sticky top-0 h-screen flex items-center justify-center text-white bg-black">
        {/* Background */}
        <div className="absolute inset-0">
          <DarkVeil />
        </div>

        {/* Stage 1: Text elements */}
        <div
          className="absolute text-8xl font-bold"
          style={{ fontFamily: "Abril Fatface" }}
        >
          <div ref={wiseRef} className="absolute">
            WISE
          </div>
          <div ref={rootreeRef} className="absolute">
            ROOTREE
          </div>
        </div>

        {/* Stage 2: Heading */}
        <h1
          ref={headingRef}
          className="absolute text-6xl font-bold opacity-0 whitespace-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          Projects of Projects
        </h1>

        {/* Stage 3: Cards */}
        <div
          ref={cardsRef}
          className="absolute flex items-center justify-start opacity-0 gap-8 top-1/2 left-0 transform -translate-y-1/2"
          style={{
            width: `${cardsData.length * 400 + (cardsData.length - 1) * 32}px`,
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="project-card rounded-2xl p-4 shadow-lg h-[300px] w-[400px] bg-gray-800 flex-shrink-0"
            >
              <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-white">Project {index + 1}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
