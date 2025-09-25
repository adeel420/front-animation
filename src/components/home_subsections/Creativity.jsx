import React, { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import DropletCanvas from "../DropletCanvas";

gsap.registerPlugin(ScrollTrigger);

const Creativity = () => {
  const sectionsRef = useRef([]);
  const lenisRef = useRef(null);
  const rafId = useRef(null);

  // ✅ Memoized sections list
  const sectionIndices = useMemo(() => [0], []);

  useEffect(() => {
    const splitInstances = [];

    sectionsRef.current.forEach((el) => {
      if (!el) return;
      const bg = el.dataset.bgColor || "#8e44ad";
      const fg = el.dataset.fgColor || "white";

      const splitText = new SplitType(el, { types: "chars" });
      splitInstances.push(splitText);

      gsap.fromTo(
        splitText.chars,
        { color: bg },
        {
          color: fg,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            toggleActions: "play play reverse reverse",
          },
        }
      );
    });

    // ✅ Lenis smooth scroll setup
    lenisRef.current = new Lenis();
    const raf = (time) => {
      lenisRef.current.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    // ✅ Cleanup
    return () => {
      splitInstances.forEach((instance) => instance.revert());
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenisRef.current = null;
    };
  }, [sectionIndices]);

  return (
    <div
      data-section="creativity"
      className="flex flex-col-reverse lg:flex-row items-start justify-start px-4 sm:px-8 md:px-16 lg:px-32 py-16 sm:py-24 md:py-32 gap-6 sm:gap-10 lg:gap-12 relative overflow-hidden"
    >
      {/* Text Section */}
      <div className="flex flex-col w-full lg:w-1/2 gap-6 text-left relative z-10">
        <h1
          ref={(el) => (sectionsRef.current[0] = el)}
          className="text-xl sm:text-2xl md:text-3xl lg:text-[4xl xl:text-5xl] leading-tight reveal-type font-regular"
          data-bg-color="#8e44ad"
          data-fg-color="white"
          style={{ fontFamily: "Noto Sans KR, sans-serif" }}
        >
          <span>Innate creativity</span> stems from meticulous attention to
          detail. At Waru, we don't just produce;{" "}
          <span className="mt-[100px] md:mt-[0] ">
            we pay close attention to every pixel. We'll work with you to
            realize your vision.
          </span>
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed font-regular"
          style={{ fontFamily: "Noto Sans KR, sans-serif" }}
        >
          타고난 창의력은, 세밀한 디테일에서 나옵니다 <br />
          저희 와루는 단순 제작이 아닌 <br />
          모든 픽셀에 신경을 써서 <br />
          <br />
          당신의 비전을 함께 제작해나가겠습니다
        </p>
      </div>

      {/* Droplet Canvas Background */}
      <div
        className="
          absolute 
          bottom-0 
          top-20
          left-30 
          right-0 
          w-full h-[40vh] sm:h-[50vh] md:h-[60vh] 
          md:top-[-70px]   
          md:right-[-400px] 
          md:left-[380px] 
          md:bottom-auto  
          md:w-[100%] 
          md:h-full 
          z-0
        "
      >
        <DropletCanvas />
      </div>
    </div>
  );
};

export default Creativity;
