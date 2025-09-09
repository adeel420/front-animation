import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
          {/* Newsletter section */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-start gap-2">
              <span className="text-xs md:text-sm font-medium tracking-wide">
                SIGN UP FOR NEWSLETTER
              </span>
              <span className="text-md md:text-lg">+</span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="text-xs md:text-sm font-medium tracking-wide">
                SIGN UP FOR NEWSLETTER
              </span>
              <span className="text-md md:text-lg">+</span>
            </div>
            <div className="flex items-center justify-start gap-2">
              <span className="text-xs md:text-sm font-medium tracking-wide">
                SIGN UP FOR NEWSLETTER
              </span>
              <span className="text-md md:text-lg">+</span>
            </div>
          </div>

          {/* Social media section */}
          <div className="space-y-3 md:space-y-4 text-center md:text-center">
            <div>
              <a
                href="#"
                className="text-xs md:text-sm font-medium tracking-wide hover:text-gray-300 transition-colors"
              >
                INSTAGRAM
              </a>
            </div>
            <div>
              <a
                href="#"
                className="text-xs md:text-sm font-medium tracking-wide hover:text-gray-300 transition-colors"
              >
                FACEBOOK
              </a>
            </div>
          </div>

          {/* Contact information */}
          <div className="space-y-2 text-center md:text-right">
            <div className="text-xs md:text-sm">
              <span className="font-medium">E.</span> 1234@naver.com
            </div>
            <div className="text-xs md:text-sm">
              <span className="font-medium">P.</span> 031-1234-4567
            </div>
            <div className="text-xs md:text-sm">
              <span className="font-medium">F.</span> 031-1234-4596
            </div>
          </div>
        </div>

        {/* Large brand name */}
        <div className="text-center mb-6 md:mb-8">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight"
            style={{ fontFamily: "Abril Fatface, serif" }}
          >
            WISEROOTREE
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
