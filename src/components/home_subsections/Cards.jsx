import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData } from "../../data/Data";

gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      const ctx = gsap.context(() => {
        const ww = window.innerWidth;
        const totalWidth = wrapperRef.current.scrollWidth;
        const scrollDistance = totalWidth - ww;

        // Set container height dynamically
        gsap.set(containerRef.current, {
          height: scrollDistance,
        });

        // Create timeline with smooth scrolling
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => "+=" + scrollDistance,
            scrub: 1.2, // ✅ Increased for smoother effect
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -1,
            // ✅ Smooth scrolling callbacks
            onUpdate: (self) => {
              // Optional: Add momentum effect
              const velocity = self.getVelocity();
              if (Math.abs(velocity) > 300) {
                gsap.to(wrapperRef.current, {
                  rotationY: velocity > 0 ? -0.5 : 0.5,
                  duration: 0.3,
                });
              } else {
                gsap.to(wrapperRef.current, {
                  rotationY: 0,
                  duration: 0.3,
                });
              }
            },
          },
        });

        // Initial position
        gsap.set(wrapperRef.current, {
          x: 0,
          force3D: true, // ✅ Force hardware acceleration
        });

        // Smooth horizontal movement
        tl.to(wrapperRef.current, {
          x: -scrollDistance,
          ease: "none", // ✅ Use "none" for scrub animations
          force3D: true,
        });
      });

      // Optimized resize handler
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150); // ✅ Reduced delay for better responsiveness
      };

      window.addEventListener("resize", handleResize, { passive: true });

      return () => {
        window.removeEventListener("resize", handleResize);
        ctx.revert(); // ✅ Clean cleanup with context
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-screen px-4 sm:px-8 z-10"
          style={{
            width: "max-content",
            willChange: "transform", // ✅ Optimize for animations
            backfaceVisibility: "hidden",
            perspective: "100px", // ✅ Enable 3D context
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl p-3 sm:p-4 w-[260px] md:w-[300px] lg:w-[340px] flex-shrink-0
                        transition-all duration-500 hover:scale-105 hover:-translate-y-2" // ✅ Smoother hover
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="bg-[#D9D9D9] rounded-xl overflow-hidden relative"
                style={{
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  transition: "box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-[220px] md:h-[300px] lg:h-[340px] object-cover
                           transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                              opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h1
                className="font-bold mt-3 sm:mt-4 text-lg md:text-xl text-white
                           transition-colors duration-300 hover:text-blue-300"
              >
                {" "}
                {card.title}
              </h1>
              <p
                className="text-sm md:text-base opacity-70 text-gray-300
                          transition-opacity duration-300 hover:opacity-90"
              >
                {" "}
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
