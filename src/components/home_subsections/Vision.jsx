import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { assets } from "../../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const first = firstRef.current;
    const second = secondRef.current;

    if (!first || !second) return;

    // First text fade out
    gsap.fromTo(
      first,
      { opacity: 1 },
      {
        duration: 0.1,
        opacity: 0,
        scrollTrigger: {
          trigger: first,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Second text fade in
    gsap.fromTo(
      second,
      { opacity: 0 },
      {
        duration: 0.1,
        opacity: 1,
        scrollTrigger: {
          trigger: first,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div
      data-section="vision"
      className="w-screen h-screen flex items-center justify-center bg-black text-white relative overflow-hidden"
      style={{
        fontFamily: "Noto Sans KR, sans-serif",
        backgroundImage: `url(${assets.creativityBg})`,
      }}
    >
      {/* First text */}
      <div
        ref={firstRef}
        className="absolute text-center leading-snug space-y-4"
      >
        <span className="block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          디자인은 메세지를 담고
        </span>
        <span className="block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          마케팅은 고객의
        </span>
        <span className="block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          마음을 움직입니다
        </span>
      </div>

      {/* Second text */}
      <div
        ref={secondRef}
        className="absolute text-center leading-snug space-y-6 opacity-0"
      >
        <span className="block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          PLANT YOUR VISION
        </span>
        <span className="block text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          BEHIND EACH PIXEL
        </span>
      </div>
    </div>
  );
};

export default Vision;
