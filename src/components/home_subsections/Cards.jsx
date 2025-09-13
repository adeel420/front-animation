import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsData } from "../../data/Data";

gsap.registerPlugin(ScrollTrigger);

const Cards = () => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current && containerRef.current) {
      const cards = wrapperRef.current.children;
      const cardWidth = 340;
      const gap = 40;
      const totalWidth = (cards.length - 1) * (cardWidth + gap) + cardWidth;

      // Performance optimization
      gsap.set(wrapperRef.current, {
        will: "transform",
        transform: "translateZ(0)", // Force hardware acceleration
      });

      gsap.to(wrapperRef.current, {
        x: -(totalWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => "+=" + totalWidth * 0.8, // Reduced multiplier for faster animation
          scrub: 0.8, // More responsive scrub value
          pin: true,
          anticipatePin: 1, // Better pin performance
          invalidateOnRefresh: true, // Handle resize better
          fastScrollEnd: true, // Better performance on fast scroll
        },
      });

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "100vh" }} // Reduced height for faster scroll
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div
          ref={wrapperRef}
          className="flex items-center gap-10 pl-20"
          style={{
            willChange: "transform", // Optimize for animations
          }}
        >
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="card rounded-2xl p-3 sm:p-4 shadow-lg w-[260px] sm:w-[260px] md:w-[300px] lg:w-[340px] flex-shrink-0 transition-transform duration-300 hover:scale-105"
              style={{
                backfaceVisibility: "hidden", // Prevent flickering
                transform: "translateZ(0)", // Force hardware acceleration
              }}
            >
              <div className="bg-[#D9D9D9] rounded-xl overflow-hidden">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-[160px] sm:h-[220px] md:h-[300px] lg:h-[340px] object-cover"
                  loading="lazy" // Optimize image loading
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                />
              </div>
              <h1 className="font-bold mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl text-white">
                {card.title}
              </h1>
              <p className="text-xs sm:text-sm md:text-base opacity-70 text-gray-300">
                {card.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Cards;
