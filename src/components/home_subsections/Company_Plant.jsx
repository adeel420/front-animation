import React from "react";
import { IoIosArrowRoundDown } from "react-icons/io";
import Iridescence from "../../animations/Iridescence";

const Company_Plant = () => {
  return (
    <div>
      <div className="flex flex-col text-white px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="text-white flex flex-col md:flex-row gap-4 xs:gap-6">
          <div className="flex justify-between w-full border-t pt-6 pb-4 xs:py-8 md:w-1/2 md:pr-3 lg:pr-6">
            <div className="flex flex-col gap-0.5 xs:gap-1">
              <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold">
                COMPANY
              </h1>
              <p className="text-xs xs:text-sm">프로젝트 설명입니다.</p>
            </div>
            <div className="text-2xl xs:text-3xl">
              <IoIosArrowRoundDown />
            </div>
          </div>

          <div className="flex justify-between w-full border-t pt-6 pb-4 xs:py-8 md:w-1/2 md:pl-3 lg:pl-6 ">
            <div className="flex flex-col gap-0.5 xs:gap-1">
              <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
              <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold">
                COMPANY
              </h1>
              <p className="text-xs xs:text-sm">프로젝트 설명입니다.</p>
            </div>
            <div className="text-2xl xs:text-3xl">
              <IoIosArrowRoundDown />
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full border-y py-6 xs:py-8">
          <div className="flex flex-col gap-0.5 xs:gap-1">
            <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
            <h1 className="text-lg xs:text-xl sm:text-2xl font-semibold">
              COMPANY
            </h1>
            <p className="text-xs xs:text-sm">프로젝트 설명입니다.</p>
          </div>
          <div className="text-2xl xs:text-3xl">
            <IoIosArrowRoundDown />
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-white relative min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] xl:min-h-[75vh] overflow-hidden">
        {/* Iridescence Background */}
        <Iridescence
          color={[0.5, 0.8, 1]}
          mouseReact={true}
          amplitude={0.2}
          speed={1.5}
          className="absolute inset-0 z-0 h-full w-full"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <div className="text-center flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10 w-full px-3 xs:px-4 sm:px-5 max-w-full">
            {/* Text container with improved responsiveness and overflow control */}
            <div className="rounded-2xl p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10 w-[85%] xs:w-[80%] sm:w-[75%] md:w-[70%] lg:w-[65%] xl:w-[60%] mx-auto box-border">
              <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-3 xs:mb-3 sm:mb-4 md:mb-4 lg:mb-5 xl:mb-6 leading-tight xs:leading-snug sm:leading-normal break-words">
                당신의 꿈을 실현시켜드릴, 와루입니다.
              </p>
              <h1
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 xs:mb-4 sm:mb-5 md:mb-5 lg:mb-6 xl:mb-7 leading-tight xs:leading-snug sm:leading-normal break-words whitespace-nowrap"
                style={{ fontFamily: "Abril Fatface, serif" }}
              >
                PLANT YOUR VISION
              </h1>
              <button className="bg-white text-black py-1 xs:py-2 sm:py-2 md:py-2.5 lg:py-3 xl:py-3 px-6 xs:px-7 sm:px-8 md:px-10 lg:px-12 xl:px-16 rounded-full font-semibold cursor-pointer text-xs xs:text-sm sm:text-base md:text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 whitespace-nowrap">
                견적문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Company_Plant;
