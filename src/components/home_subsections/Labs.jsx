import React, { useState } from "react";
import { assets } from "../../assets/assets";

const labsData = [
  {
    id: 1,
    title: "Laptop Project",
    img: assets.laptop,
  },
  {
    id: 2,
    title: "Red Cap Working",
    img: assets.cap,
  },
  {
    id: 3,
    title: "Ocean Water",
    img: assets.sea,
  },
  {
    id: 4,
    title: "Desert Landscape",
    img: assets.landscape,
  },
  {
    id: 5,
    title: "Canyon Rocks",
    img: assets.art,
  },
  {
    id: 6,
    title: "Technology Circuit",
    img: assets.laptop, // fix placeholder
  },
  {
    id: 7,
    title: "Mountain Landscape",
    img: assets.mountain,
  },
  {
    id: 8,
    title: "Abstract Art",
    img: assets.art,
  },
  {
    id: 9,
    title: "Workspace",
    img: assets.work,
  },
  {
    id: 10,
    title: "Nature Landscape",
    img: assets.nature,
  },
];

const Labs = () => {
  const [isGrid, setIsGrid] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative mt-16">
      {/* Top right logo */}
      <div className="absolute top-8 right-8 z-20">
        <div className="text-white text-2xl font-bold">W.</div>
      </div>

      {/* Floating / Grid images */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
          isGrid
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-8"
            : ""
        }`}
      >
        {labsData.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 hover:scale-105 ${
              isGrid ? "relative w-full h-40 rotate-0" : "absolute"
            }`}
            style={
              !isGrid
                ? {
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    width: `${80 + Math.random() * 120}px`,
                    height: `${60 + Math.random() * 120}px`,
                    rotate: `${Math.floor(Math.random() * 40) - 20}deg`,
                  }
                : {}
            }
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-8">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white">
          301lab의 역사
        </h1>

        <div className="space-y-2 mb-8">
          <p className="text-xl text-gray-300">24년을 탐험하다</p>
          <p className="text-lg text-gray-400">우리의 작업</p>
        </div>

        {/* Button */}
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="rounded-full px-8 py-3 text-white border border-white hover:bg-white hover:text-black transition-colors bg-transparent text-lg md:text-xl"
        >
          {isGrid ? "뒤로 가기" : "프로젝트 안내"}
        </button>
      </div>

      {/* Bottom right Windows text */}
      <div className="absolute bottom-8 right-8 text-sm text-gray-500 text-right">
        <div>Windows 정품 인증</div>
        <div className="text-xs">
          설정으로 이동하여 Windows를 정품 인증합니다.
        </div>
      </div>
    </div>
  );
};

export default Labs;
