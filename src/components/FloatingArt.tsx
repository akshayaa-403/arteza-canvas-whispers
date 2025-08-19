import React from "react";

export default function FloatingArt() {
  // Enhanced floating decorative elements with calming aesthetic
  return (
    <>
      {/* Primary floating elements - larger and more prominent */}
      <div className="fixed top-[15%] left-[8%] w-12 md:w-20 lg:w-24 opacity-30 pointer-events-none animate-gentle-float z-30">
        <svg viewBox="0 0 120 120" fill="none" className="animate-breathe">
          <circle cx="60" cy="60" r="40" fill="url(#gradient1)" />
          <circle cx="60" cy="60" r="25" fill="url(#gradient2)" opacity="0.6" />
          <defs>
            <radialGradient id="gradient1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E4A373" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#DDEBC4" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="gradient2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DDEBC4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4A373" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Secondary floating elements - mid-size */}
      <div className="fixed top-[65%] left-[5%] w-8 md:w-14 lg:w-16 opacity-25 pointer-events-none animate-watercolor-float z-30" style={{ animationDelay: '1s' }}>
        <svg viewBox="0 0 80 80" fill="none">
          <ellipse cx="40" cy="40" rx="30" ry="20" fill="url(#gradient3)" transform="rotate(15 40 40)" />
          <ellipse cx="40" cy="40" rx="20" ry="15" fill="url(#gradient4)" opacity="0.7" transform="rotate(-10 40 40)" />
          <defs>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DDEBC4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D2845A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#DDEBC4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Right side floating elements */}
      <div className="fixed top-[25%] right-[6%] w-10 md:w-18 lg:w-20 opacity-35 pointer-events-none animate-gentle-float z-30" style={{ animationDelay: '2s' }}>
        <svg viewBox="0 0 100 100" fill="none" className="animate-breathe" style={{ animationDelay: '1s' }}>
          <path d="M50 10 Q80 30 70 60 Q50 80 30 60 Q20 30 50 10" fill="url(#gradient5)" />
          <circle cx="50" cy="45" r="8" fill="url(#gradient6)" opacity="0.8" />
          <defs>
            <radialGradient id="gradient5" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E4A373" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#9B6B47" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="gradient6" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DDEBC4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E4A373" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom right accent */}
      <div className="fixed bottom-[20%] right-[10%] w-6 md:w-10 lg:w-12 opacity-20 pointer-events-none animate-watercolor-float z-30" style={{ animationDelay: '3s' }}>
        <svg viewBox="0 0 60 60" fill="none">
          <ellipse cx="30" cy="30" rx="25" ry="15" fill="url(#gradient7)" />
          <ellipse cx="30" cy="30" rx="15" ry="10" fill="url(#gradient8)" opacity="0.7" />
          <defs>
            <linearGradient id="gradient7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8805A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F5F0E8" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="gradient8" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DDEBC4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4A373" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Top right corner accent */}
      <div className="fixed top-[8%] right-[15%] w-4 md:w-6 lg:w-8 opacity-25 pointer-events-none animate-gentle-float z-30" style={{ animationDelay: '4s' }}>
        <svg viewBox="0 0 40 40" fill="none" className="animate-breathe" style={{ animationDelay: '2s' }}>
          <circle cx="20" cy="20" r="15" fill="url(#gradient9)" />
          <defs>
            <radialGradient id="gradient9" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DDEBC4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#E4A373" stopOpacity="0.1" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom left accent */}
      <div className="fixed bottom-[35%] left-[12%] w-5 md:w-8 lg:w-10 opacity-30 pointer-events-none animate-watercolor-float z-30" style={{ animationDelay: '5s' }}>
        <svg viewBox="0 0 50 50" fill="none">
          <polygon points="25,5 45,20 35,40 15,40 5,20" fill="url(#gradient10)" />
          <defs>
            <linearGradient id="gradient10" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7A8471" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#DDEBC4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mobile-only smaller accents */}
      <div className="fixed top-[45%] left-[3%] w-3 md:hidden opacity-20 pointer-events-none animate-gentle-float z-30" style={{ animationDelay: '6s' }}>
        <svg viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="10" fill="#E4A373" fillOpacity="0.3" />
        </svg>
      </div>

      <div className="fixed top-[80%] right-[8%] w-3 md:hidden opacity-20 pointer-events-none animate-watercolor-float z-30" style={{ animationDelay: '7s' }}>
        <svg viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="8" fill="#DDEBC4" fillOpacity="0.4" />
        </svg>
      </div>

      {/* Subtle background texture overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="texture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#E4A373" opacity="0.3" />
              <circle cx="5" cy="5" r="0.5" fill="#DDEBC4" opacity="0.4" />
              <circle cx="15" cy="15" r="0.5" fill="#B8805A" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#texture)" />
        </svg>
      </div>
    </>
  );
}