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
      const ww = window.innerWidth;
      const totalWidth = wrapperRef.current.scrollWidth;

      // ✅ GSAP Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + (totalWidth - ww),
          scrub: 0.3, // ✅ thoda smooth scrub (lag kam)
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(wrapperRef.current, { x: 0 });

      tl.to(wrapperRef.current, {
        x: -(totalWidth - ww),
        ease: "power1.out", // ✅ better easing
      });

      // ✅ Debounced refresh on resize
      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 200);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 h-screen px-4 sm:px-8 z-10"
          style={{ width: "max-content" }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="rounded-2xl p-3 sm:p-4 w-[260px] md:w-[300px] lg:w-[340px] flex-shrink-0 
                         transition-transform duration-300 hover:scale-105"
              style={{
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
                willChange: "transform", // ✅ GPU optimization
              }}
            >
              <div
                className="bg-[#D9D9D9] rounded-xl overflow-hidden"
                style={{
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)", // ✅ light shadow
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-[220px] md:h-[300px] lg:h-[340px] object-cover"
                  loading="lazy"
                  decoding="async"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                />
              </div>
              <h1 className="font-bold mt-3 sm:mt-4 text-lg md:text-xl text-white">
                {card.title}
              </h1>
              <p className="text-sm md:text-base opacity-70 text-gray-300">
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
