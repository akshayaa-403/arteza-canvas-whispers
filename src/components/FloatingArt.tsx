
import React from "react";

export default function FloatingArt() {
  // Several floating decorative SVGs: paintbrush, leaf, splash
  return (
    <>
      <svg className="fixed top-[13%] left-[6%] w-10 md:w-20 opacity-40 pointer-events-none animate-gentle-float z-40"
        viewBox="0 0 48 70" fill="none">
        <ellipse cx="25" cy="35" rx="22" ry="16" fill="#E4A373" fillOpacity="0.18"/>
      </svg>
      <svg className="fixed top-[60%] left-[7%] w-10 md:w-16 opacity-25 pointer-events-none animate-watercolor-float z-40"
        viewBox="0 0 32 43" fill="none">
        <ellipse cx="17" cy="19" rx="15" ry="10" fill="#DDEBC4" fillOpacity="0.18"/>
      </svg>
      <svg className="fixed top-[32%] right-[3%] w-16 md:w-32 opacity-30 pointer-events-none animate-watercolor-float z-50"
        viewBox="0 0 80 60" fill="none">
        <ellipse cx="40" cy="30" rx="40" ry="18" fill="#d2845a" fillOpacity="0.14"/>
      </svg>
    </>
  );
}
