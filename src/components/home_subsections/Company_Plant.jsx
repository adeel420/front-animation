import React, { useState } from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import Iridescence from "../../animations/Iridescence";

const Company_Plant = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  const [selected1, setSelected1] = useState("COMPANY 1");
  const [selected2, setSelected2] = useState("COMPANY A");
  const [selected3, setSelected3] = useState("COMPANY X");

  const companies1 = ["COMPANY 1", "COMPANY 2", "COMPANY 3"];
  const companies2 = ["COMPANY A", "COMPANY B", "COMPANY C"];
  const companies3 = ["COMPANY X", "COMPANY Y", "COMPANY Z"];

  const Dropdown = ({ open, setOpen, selected, setSelected, options }) => (
    <div className="relative w-full">
      <div
        className="flex justify-between items-center bg-black px-4 py-3 rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="text-lg xs:text-xl sm:text-2xl font-semibold">
          {selected}
        </span>
        <span className="text-2xl xs:text-3xl">
          {open ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />}
        </span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-black border border-white/30 rounded-lg z-20">
          {options.map((company, i) => (
            <div
              key={i}
              className="px-4 py-2 hover:bg-white/10 cursor-pointer text-lg xs:text-xl sm:text-2xl font-semibold"
              onClick={() => {
                setSelected(company);
                setOpen(false);
              }}
            >
              {company}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex flex-col text-white px-4 xs:px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="text-white flex flex-col md:flex-row gap-4 xs:gap-6">
          {/* First block */}
          <div className="flex justify-between w-full border-t pt-6 pb-4 xs:py-8 md:w-1/2 md:pr-3 lg:pr-6">
            <div className="flex flex-col gap-0.5 xs:gap-1 flex-1">
              <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
              <Dropdown
                open={open1}
                setOpen={setOpen1}
                selected={selected1}
                setSelected={setSelected1}
                options={companies1}
              />
              <p className="text-xs xs:text-sm mt-1">프로젝트 설명입니다.</p>
            </div>
          </div>

          {/* Second block */}
          <div className="flex justify-between w-full border-t pt-6 pb-4 xs:py-8 md:w-1/2 md:pl-3 lg:pl-6">
            <div className="flex flex-col gap-0.5 xs:gap-1 flex-1">
              <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
              <Dropdown
                open={open2}
                setOpen={setOpen2}
                selected={selected2}
                setSelected={setSelected2}
                options={companies2}
              />
              <p className="text-xs xs:text-sm mt-1">프로젝트 설명입니다.</p>
            </div>
          </div>
        </div>

        {/* Third block */}
        <div className="flex justify-between w-full border-y py-6 xs:py-8">
          <div className="flex flex-col gap-0.5 xs:gap-1 flex-1">
            <p className="text-xs xs:text-sm">회사소개서 다운로드</p>
            <Dropdown
              open={open3}
              setOpen={setOpen3}
              selected={selected3}
              setSelected={setSelected3}
              options={companies3}
            />
            <p className="text-xs xs:text-sm mt-1">프로젝트 설명입니다.</p>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="mt-8 xs:mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24 text-white relative min-h-[50vh] xs:min-h-[55vh] sm:min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh] xl:min-h-[75vh] overflow-hidden">
        <Iridescence
          color={[0.5, 0.8, 1]}
          mouseReact={true}
          amplitude={0.2}
          speed={1.5}
          className="absolute inset-0 z-0 h-full w-full"
        />
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden">
          <div className="text-center flex flex-col items-center gap-4 xs:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10 w-full px-3 xs:px-4 sm:px-5 max-w-full">
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
