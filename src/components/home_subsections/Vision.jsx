import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { visionData } from "../../data/Data";
import { assets } from "../../assets/assets";

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const containerRef = useRef(null);
  const thirdCardsRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sections = gsap.utils.toArray(".horizontal-section");

    // Set width of the container to total width of sections
    gsap.set(container, {
      width: sections.length * window.innerWidth,
      display: "flex",
    });

    // Horizontal scroll effect
    gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container.parentNode,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + (container.scrollWidth - window.innerWidth),
        markers: false,
      },
    });

    // Subtle horizontal movement for 3rd section cards
    if (thirdCardsRef.current) {
      gsap.fromTo(
        thirdCardsRef.current,
        { x: 0 },
        {
          x: -50,
          ease: "none",
          scrollTrigger: {
            trigger: thirdCardsRef.current.parentNode,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            markers: false,
          },
        }
      );
    }

    // Clean up ScrollTriggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="w-screen overflow-x-hidden">
      <div ref={containerRef} className="h-screen flex">
        {/* 1st Section */}
        <div className="horizontal-section flex-shrink-0 w-screen h-screen relative">
          <img
            src={assets.creativityBg}
            alt="creativity"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center gap-2 sm:gap-4 px-4">
            <span className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold leading-snug">
              디자인은 메세지를 담고
            </span>
            <span className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold leading-snug">
              마케팅은 고객의
            </span>
            <span className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold leading-snug">
              마음을 움직입니다
            </span>
          </div>
        </div>

        {/* 2nd Section */}
        <div
          className="horizontal-section flex-shrink-0 w-screen h-screen relative flex items-center justify-center"
          style={{
            background:
              "linear-gradient(90deg,rgba(109, 99, 160, 1) 0%, rgba(72, 45, 90, 1) 50%, rgba(29, 32, 113, 1) 100%)",
          }}
        >
          <div className="flex flex-col items-center justify-center text-white text-center px-4 sm:px-8">
            <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold">
              PLANT YOUR VISION
            </span>
            <span className="text-sm sm:text-lg md:text-2xl lg:text-4xl font-bold">
              BEHIND EACH PIXEL
            </span>
          </div>
        </div>

        {/* 3rd Section */}
        <div className="ml-12 md:ml-0 horizontal-section flex-shrink-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 relative bg-black">
          <div
            className="flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto max-w-full pb-6 scrollbar-thin scrollbar-thumb-gray-600"
            ref={thirdCardsRef}
          >
            {visionData.map((data) => (
              <div
                key={data.id}
                className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] 
                           h-[160px] sm:h-[200px] md:h-[240px] lg:h-[280px] 
                           bg-gradient-to-b from-gray-900 to-black 
                           rounded-2xl flex flex-col items-center justify-center 
                           p-3 sm:p-4 md:p-6 
                           text-white shadow-lg flex-shrink-0"
              >
                <h1 className="font-bold text-xs sm:text-sm md:text-base lg:text-lg text-center mb-2">
                  {data.title}
                </h1>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-300 text-center leading-snug">
                  {data.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision;
