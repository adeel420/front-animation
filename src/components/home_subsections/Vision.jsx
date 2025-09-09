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

    // Set container width to hold all sections horizontally
    let totalWidth = 0;
    sections.forEach((section, index) => {
      gsap.set(section, { width: "100vw" }); // All sections same width
      totalWidth += window.innerWidth;
    });

    gsap.set(container, { width: totalWidth + "px", display: "flex" });

    // Horizontal scroll for the entire container
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

    // Horizontal scrolling for small cards in 3rd section (optional subtle movement)
    const thirdSectionCards = thirdCardsRef.current;
    if (thirdSectionCards) {
      gsap.fromTo(
        thirdSectionCards,
        { x: 0 },
        {
          x: -50, // subtle left movement
          ease: "none",
          scrollTrigger: {
            trigger: thirdSectionCards.parentNode,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            markers: false,
          },
        }
      );
    }

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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center gap-2 md:gap-4 px-4">
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold">
              디자인은 메세지를 담고
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold">
              마케팅은 고객의
            </span>
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-bold">
              마음을 움직입니다
            </span>
          </div>
        </div>
        {/* 2nd Section */}
        <div
          className="horizontal-section flex-shrink-0 h-screen flex items-center justify-center px-4 sm:px-8 lg:px-16 relative"
          style={{
            backgroundImage: `url(${assets.creativityBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex w-full h-full items-center justify-center gap-16">
            <div className="flex-1 flex flex-col justify-center items-center text-center text-white px-4 sm:px-8">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold">
                PLANT YOUR VISION
              </span>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold">
                BEHIND EACH PIXEL
              </span>
            </div>
          </div>
        </div>
        {/* 3rd Section */} {/* 3rd Section */}
        <div
          className="horizontal-section flex-shrink-0 h-screen flex flex-col items-center justify-center px-8 relative"
          style={{
            backgroundColor: "black",
          }}
        >
          <div
            className="flex gap-6 mb-8 overflow-x-auto"
            id="third-section-cards"
            ref={thirdCardsRef}
          >
            {visionData.map((data) => (
              <div
                key={data.id}
                className="w-[200px] h-[200px] bg-black rounded-xl flex flex-col items-center justify-center p-4 text-white overflow-hidden"
              >
                <h1 className="font-bold text-sm sm:text-base md:text-lg text-center break-words">
                  {data.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center break-words">
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
