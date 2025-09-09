import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import { assets } from "../../assets/assets";
import DropletCanvas from "../DropletCanvas";

gsap.registerPlugin(ScrollTrigger);

const Creativity = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Animate each ".reveal-type" element
    sectionsRef.current.forEach((el) => {
      if (!el) return;
      const bg = el.dataset.bgColor || "#8e44ad"; // initial color
      const fg = el.dataset.fgColor || "white"; // final color on scroll

      const splitText = new SplitType(el, { types: "chars" });

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

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-32 sm:px-32 gap-12">
      {/* Text */}
      <div className="flex flex-col w-full lg:w-1/2 gap-6 text-center lg:text-left">
        <h1
          ref={(el) => (sectionsRef.current[0] = el)}
          className="text-2xl sm:text-3xl lg:text-4xl text-center leading-tight reveal-type z-40"
          data-bg-color="#8e44ad" // initial purple
          data-fg-color="white" // final white
        >
          <span>Innate creativity</span> stems from meticulous attention to
          detail. At Waru, we don't just produce;{" "}
          <span>
            we pay close attention to every pixel. We'll work with you to
            realize your vision.
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
          타고난 창의력은, 세밀한 디테일에서 나옵니다 <br />
          저희 와루는 단순 제작이 아닌 <br />
          모든 픽셀에 신경을 써서 <br />
          <br />
          당신의 비전을 함께 제작해나가겠습니다
        </p>
      </div>

      <div className="hidden md:block w-full lg:w-1/2 flex justify-center">
        <img
          src={assets.creativity}
          alt="Creativity"
          className="w-full max-w-md lg:max-w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Creativity;
