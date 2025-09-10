import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services_Section = () => {
  const itemsRef = useRef([]);

  useEffect(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { x: -100, opacity: 0 }, // start left and invisible
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%", // trigger when top of element reaches 80% of viewport
            toggleActions: "play none none reverse", // play on enter, reverse on leave back
          },
        }
      );
    });
  }, []);

  const services = [
    { eng: "Planning", kor: "기획" },
    { eng: "UI/UX DESIGN", kor: "디자인" },
    { eng: "Program Development", kor: "프로그램 개발" },
    { eng: "AI artificial intelligence", kor: "AI 인공지능" },
    { eng: "Marketing", kor: "마케팅" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black px-6 sm:px-12 md:px-16 lg:px-24 py-16 sm:py-24 md:py-32">
      {/* Top right Korean text */}
      <div className="absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8 text-right text-white text-xs sm:text-sm md:text-base leading-relaxed max-w-[220px] sm:max-w-xs z-20">
        <p>다양한 시각과 전략으로</p>
        <p>당신의 브랜드를 뿌리부터 열매가</p>
        <p>열릴때까지 함께 성장시키는 와루입니다.</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 mt-8 md:mt-0 flex flex-col justify-center space-y-10 sm:space-y-12 md:space-y-16">
        {services.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-4 md:gap-6 text-left"
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-light text-white text-center sm:text-left">
              {item.eng}
            </h2>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 text-center sm:text-left">
              {item.kor}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services_Section;
