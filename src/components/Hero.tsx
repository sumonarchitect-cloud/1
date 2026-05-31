import React from "react";
import { motion } from "motion/react";
import { HeroData } from "../types";
import { Edit3, ArrowRight } from "lucide-react";

interface HeroProps {
  data: HeroData;
  isCmsActive: boolean;
  onEdit: () => void;
  onViewProjects: () => void;
  onGetConsultation: () => void;
}

export default function Hero({ data, isCmsActive, onEdit, onViewProjects, onGetConsultation }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-[#f5f5f5] px-6 md:px-12 pt-24"
    >
      {/* Background Image with Clean Grayscale Architectural Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={data.backgroundImageUrl}
          alt="Architectural Backdrop"
          className="w-full h-full object-cover grayscale opacity-15 mix-blend-multiply filter contrast-100 transition duration-1000"
        />
        {/* Subtle dot grid pattern from Design HTML */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#1a1a1a 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
        {/* Light overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f5] via-transparent to-[#f5f5f5]/30 pointer-events-none" />
      </div>

      {/* Hero Visual CMS floating button */}
      {isCmsActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="absolute top-28 right-8 z-30 flex items-center space-x-1.5 bg-white text-zinc-950 border border-zinc-200 shadow-md px-4 py-2 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] font-mono text-xs uppercase tracking-wider rounded-none transition duration-300 pointer-events-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Hero Section</span>
        </button>
      )}

      {/* Grid Alignment lines for architectural blueprint feel */}
      <div className="absolute inset-y-0 left-12 md:left-24 w-[1px] bg-zinc-300/45 pointer-events-none" />
      <div className="absolute inset-y-0 right-12 md:right-24 w-[1px] bg-zinc-300/45 pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-left flex flex-col items-start pl-0 md:pl-12">
        {/* Animated small brand tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex items-center space-x-3"
        >
          <div className="h-[1px] w-8 bg-[#1a1a1a]/40" />
          <span className="font-sans text-xs md:text-sm text-[#1a1a1a]/60 tracking-[0.35em] uppercase font-semibold">
            MARK D STUDIO ARCHITECTURE
          </span>
        </motion.div>

        {/* Headline with structural border on the left */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#1a1a1a] tracking-tighter leading-[0.95] mb-8 border-l-4 border-[#1a1a1a] pl-6 md:pl-8"
        >
          {data.headline.split(".").map((sentence, idx) => {
            if (!sentence.trim()) return null;
            return (
              <span key={idx} className="block last:font-medium">
                {sentence.trim()}.
              </span>
            );
          })}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-sans font-light text-base sm:text-lg md:text-xl text-zinc-600 tracking-wide max-w-2xl mb-12 leading-relaxed"
        >
          {data.subheadline}
        </motion.p>

        {/* Custom Actions - Razor Sharp, Minimalist Boxy Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            onClick={onViewProjects}
            className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-black text-white font-medium text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 border border-[#1a1a1a] rounded-none font-sans flex items-center justify-center space-x-2"
          >
            <span>{data.ctaTextPrimary || "View Projects"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onGetConsultation}
            className="w-full sm:w-auto bg-transparent hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] font-medium text-xs tracking-widest uppercase px-8 py-4 transition-all duration-300 border border-[#1a1a1a] rounded-none font-sans"
          >
            {data.ctaTextSecondary || "Get Consultation"}
          </button>
        </motion.div>
      </div>

      {/* Decorative vertical lines showing coordinates */}
      <div className="absolute bottom-10 left-12 md:left-24 font-mono text-[9px] text-[#1a1a1a]/40 tracking-widest hidden sm:block">
        ELEVATION 0.0M / AZIMUTH 180°
      </div>
      <div className="absolute bottom-10 right-12 md:right-24 font-mono text-[9px] text-[#1a1a1a]/40 tracking-widest hidden sm:block">
        COORD: 37° 46' 30" N / 122° 25' 10" W
      </div>
    </section>
  );
}
