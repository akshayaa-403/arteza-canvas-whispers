
import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ParallaxHero() {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setOffset(Math.min(rect.top, 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] flex flex-col justify-center py-16 overflow-hidden bg-gradient-to-br from-arteza-sage/30 to-arteza-cream"
      style={{ perspective: 1000 }}
    >
      {/* Parallax painterly background */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ transform: `translateY(${offset * 0.3}px) scale(1.08)`, zIndex: 0 }}
        viewBox="0 0 1600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M0 700V110C300 40 600 260 900 180C1200 100 1400 300 1600 80V700H0Z"
          fill="url(#paint0_linear)"
          opacity="0.32"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="1600" y2="700" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E4A373" />
            <stop offset="0.6" stopColor="#DDEBC4" />
            <stop offset="1" stopColor="#F5F0E8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Foreground Art icon */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-10 animate-watercolor-float pointer-events-none">
        <svg width="85" height="98" viewBox="0 0 85 98" fill="none">
          <ellipse cx="42" cy="49" rx="42" ry="49" fill="#e4a373" fillOpacity="0.07" />
        </svg>
      </div>

      <div className="relative z-20 mx-auto text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-arteza-charcoal drop-shadow animate-fade-in">
          A Canvas of Emotion
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-muted-foreground font-light animate-fade-in delay-150">
          Original paintings by Upasna. <br /> Where brush, spirit, and color meet to tell dreamlike stories.
        </p>
        <div className="mt-8 flex gap-5 justify-center animate-fade-in delay-300">
          <Button asChild size="lg" className="bg-arteza-terracotta hover:bg-arteza-charcoal text-white text-lg shadow">
            <Link to="/shop">Shop Artworks</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-arteza-charcoal text-arteza-charcoal hover:bg-arteza-sage/30 text-lg">
            <Link to="#collections">Browse Collections</Link>
          </Button>
        </div>
      </div>
      {/* Watercolor bottom divider */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ transform: `translateY(${offset * 0.12}px)` }}
        height="68"
        viewBox="0 0 1440 68"
        fill="none"
      >
        <path d="M0 48C120 60 410.5 -2.5 733.5 13.5C1056.5 29.5 1273 61 1440 49.5V68H0V48Z"
          fill="#fff"
          fillOpacity="1"
        />
      </svg>
    </section>
  );
}
