import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex items-center justify-between z-50 font-noto transition-colors duration-300 ${
        scrolled ? "bg-black text-white" : "bg-transparent text-white"
      }`}
    >
      {/* Left Logo */}
      <h1 className="text-lg font-bold">로고</h1>

      <nav className="hidden md:flex gap-12 absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="hover:text-gray-300 text-[16px]">
          인사말
        </Link>
        <Link to="/" className="hover:text-gray-300 text-[16px]">
          병원둘러보기
        </Link>
        <Link to="/" className="hover:text-gray-300 text-[16px]">
          입원안내
        </Link>
        <Link to="/" className="hover:text-gray-300 text-[16px]">
          간병안내
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Mobile Menu (Slide Down) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[black] flex flex-col items-center gap-6 py-6 md:hidden">
          <Link to="/" className="text-[16px]" onClick={() => setIsOpen(false)}>
            인사말
          </Link>
          <Link to="/" className="text-[16px]" onClick={() => setIsOpen(false)}>
            병원둘러보기
          </Link>
          <Link to="/" className="text-[16px]" onClick={() => setIsOpen(false)}>
            입원안내
          </Link>
          <Link to="/" className="text-[16px]" onClick={() => setIsOpen(false)}>
            간병안내
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
