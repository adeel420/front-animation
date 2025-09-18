import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services_Section = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 👇 Manual selectors for each item
      const items = gsap.utils.toArray(".service-item");

      items.forEach((item, i) => {
        let extraOffset = i < 2 ? -130 : -100; // first 2 items thoda aage se
        ScrollTrigger.create({
          trigger: item,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              item,
              { x: extraOffset, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
            );
          },
          onLeaveBack: () => {
            gsap.to(item, { x: extraOffset, opacity: 0, duration: 0.5 });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-black px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 md:py-32"
    >
      {/* Top right Korean text */}
      <div
        className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 text-right text-white text-xs sm:text-sm md:text-base leading-relaxed max-w-[220px] sm:max-w-xs z-20"
        style={{ fontFamily: "Noto Sans KR, sans-serif" }}
      >
        <p>다양한 시각과 전략으로</p>
        <p>당신의 브랜드를 뿌리부터 열매가</p>
        <p>열릴때까지 함께 성장시키는 와루입니다.</p>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 mt-8 md:mt-0 flex flex-col font-regular justify-center space-y-10 sm:space-y-12 md:space-y-16"
        style={{ fontFamily: "Noto Sans KR, sans-serif" }}
      >
        {/* 1. Planning */}
        <div className="ml-[20%] service-item flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left opacity-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
            Planning
          </h2>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
            기획
          </span>
        </div>

        {/* 2. UI/UX DESIGN */}
        <div className="ml-[20%] service-item flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left opacity-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
            UI/UX DESIGN
          </h2>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
            디자인
          </span>
        </div>

        {/* 3. Program Development */}
        <div className="ml-[10%] service-item flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left opacity-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
            Program Development
          </h2>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
            프로그램 개발
          </span>
        </div>

        {/* 4. AI artificial intelligence */}
        <div className="service-item flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left opacity-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
            AI artificial intelligence
          </h2>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
            AI 인공지능
          </span>
        </div>

        {/* 5. Marketing */}
        <div className="ml-[15%] service-item flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left opacity-0">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
            Marketing
          </h2>
          <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
            마케팅
          </span>
        </div>
      </div>
    </div>
  );
};

export default Services_Section;
