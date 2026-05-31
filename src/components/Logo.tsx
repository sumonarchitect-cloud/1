import React from "react";

interface LogoProps {
  className?: string;
  inverse?: boolean;
  showSubtitle?: boolean;
}

export default function Logo({ className = "h-16", inverse = false, showSubtitle = true }: LogoProps) {
  // Brand grey extracted from the user's logo: #6e7072
  const brandColor = inverse ? "#ffffff" : "#6e7072";
  const boxBg = inverse ? "#ffffff" : "#6e7072";
  const boxText = inverse ? "#1a1a1a" : "#ffffff";
  const subtitleColor = inverse ? "#cccccc" : "#6e7072";

  return (
    <div className={`flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 500 240"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="MARK D STUDIO Logo"
      >
        {/* BIG ARCHITECTURAL GLYPHS */}
        {/* Slanted thin stroke on the left */}
        <line
          x1="45"
          y1="130"
          x2="65"
          y2="50"
          stroke={brandColor}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Thick inverted-V for M */}
        <polyline
          points="82,130 135,10 188,130"
          fill="none"
          stroke={brandColor}
          strokeWidth="11"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeLinecap="butt"
        />

        {/* Thick inverted-V for A with horizontal crossbar protruding left */}
        <polyline
          points="215,130 262,10 309,130"
          fill="none"
          stroke={brandColor}
          strokeWidth="11"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeLinecap="butt"
        />
        <line
          x1="202"
          y1="76"
          x2="260"
          y2="76"
          stroke={brandColor}
          strokeWidth="11"
          strokeLinecap="butt"
        />

        {/* Stylized R: Column and horizontal Lintel */}
        <polyline
          points="336,130 336,10 384,10"
          fill="none"
          stroke={brandColor}
          strokeWidth="11"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeLinecap="butt"
        />

        {/* Minimalist K: Just the chevron facing left */}
        <polyline
          points="444,10 404,70 472,130"
          fill="none"
          stroke={brandColor}
          strokeWidth="11"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeLinecap="butt"
        />

        {/* Corporate Grey Box */}
        <rect x="20" y="142" width="458" height="42" fill={boxBg} />

        {/* Logo Main Text */}
        <text
          x="249"
          y="173"
          fill={boxText}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="bold"
          fontSize="29"
          letterSpacing="4"
          textAnchor="middle"
        >
          MARK <tspan fontWeight="300" fontSize="27">d</tspan> STUDIO
        </text>

        {/* Subtitle bottom row */}
        {showSubtitle && (
          <text
            x="249"
            y="214"
            fill={subtitleColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
            fontSize="10.5"
            letterSpacing="8.4"
            textAnchor="middle"
          >
            architecture , interior & construction
          </text>
        )}
      </svg>
    </div>
  );
}
