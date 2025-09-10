import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import { assets } from "../../assets/assets";
import DropletCanvas from "../DropletCanvas";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
    <div className="flex flex-col-reverse lg:flex-row items-start justify-start px-6 py-32 sm:px-32 gap-12 relative overflow-hidden">
      {/* Text */}
      <div className="flex flex-col w-full lg:w-1/2 gap-6 text-left relative z-10">
        <h1
          ref={(el) => (sectionsRef.current[0] = el)}
          className="text-2xl sm:text-3xl lg:text-4xl leading-tight reveal-type"
          data-bg-color="#8e44ad"
          data-fg-color="white"
        >
          <span>Innate creativity</span> stems from meticulous attention to
          detail. At Waru, we don't just produce;{" "}
          <span>
            we pay close attention to every pixel. We'll work with you to
            realize your vision.
          </span>
        </h1>

        <p className="text-sm text-white sm:text-base lg:text-lg leading-relaxed">
          타고난 창의력은, 세밀한 디테일에서 나옵니다 <br />
          저희 와루는 단순 제작이 아닌 <br />
          모든 픽셀에 신경을 써서 <br />
          <br />
          당신의 비전을 함께 제작해나가겠습니다
        </p>
      </div>

      {/* Droplet Canvas */}
      <div
        className="absolute bottom-30 left-0 w-[50%] h-[30vh] 
             lg:top-0 lg:right-0 lg:left-auto lg:bottom-30 lg:w-[60%] lg:h-full z-0"
      >
        <DropletCanvas />
      </div>
    </div>
  );
};

export default Creativity;
