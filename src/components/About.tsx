import React from "react";
import { AboutData } from "../types";
import { Edit3, Compass, Eye, ShieldCheck, Heart } from "lucide-react";

interface AboutProps {
  data: AboutData;
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function About({ data, isCmsActive, onEdit }: AboutProps) {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-white text-zinc-900 border-b border-zinc-200 overflow-hidden"
    >
      {/* Background Architectural Grid Accent */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editor triggers */}
        {isCmsActive && (
          <div className="absolute top-0 right-0 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex items-center space-x-1.5 bg-zinc-900 text-white shadow-lg px-4 py-2 hover:bg-black font-mono text-xs uppercase tracking-wider rounded-md transition duration-300 pointer-events-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Edit About Section</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-zinc-500 uppercase block mb-3">
              01 // IDENTITY
            </span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl tracking-tight text-zinc-950">
              {data.title}
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // SPEC:01A
          </span>
        </div>

        {/* Asymmetrical Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Column 1: Descriptive Texts + Mission/Vision (7 Cols) */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-6">
              <p className="font-display font-semibold text-lg sm:text-xl md:text-2xl tracking-tight text-zinc-800 leading-snug">
                {data.subtitle}
              </p>
              <p className="font-sans font-light text-zinc-600 text-sm sm:text-base leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Core Values: Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 animate-fadeIn">
              <div className="p-8 border border-zinc-200 bg-[#f5f5f5] rounded-none border-t-4 border-t-[#1a1a1a]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 border border-zinc-200 rounded-none text-[#1a1a1a]">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-[#1a1a1a]">
                    OUR MISSION
                  </h3>
                </div>
                <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                  {data.mission}
                </p>
              </div>

              <div className="p-8 border border-zinc-200 bg-[#f5f5f5] rounded-none border-t-4 border-t-[#1a1a1a]">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 border border-zinc-200 rounded-none text-[#1a1a1a]">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-[#1a1a1a]">
                    OUR VISION
                  </h3>
                </div>
                <p className="font-sans text-xs text-zinc-650 leading-relaxed">
                  {data.vision}
                </p>
              </div>
            </div>

            {/* Philosophy block */}
            <div className="p-8 border-l-4 border-[#1a1a1a] bg-[#f5f5f5] rounded-none">
              <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-[#1a1a1a] mb-2">
                DESIGN PHILOSOPHY
              </h3>
              <p className="font-sans text-sm sm:text-base font-light text-zinc-600 leading-relaxed">
                {data.philosophy}
              </p>
            </div>
          </div>

          {/* Column 2: Stats & Key Achievements (5 Cols) */}
          <div className="lg:col-span-5 h-full flex flex-col justify-between space-y-12 lg:space-y-0 lg:pl-8">
            <div className="relative border border-zinc-200 p-8 md:p-10 bg-white rounded-none">
              <div className="absolute top-0 right-0 bg-[#1a1a1a] text-white font-mono text-[9px] px-3 py-1 uppercase tracking-widest rounded-none">
                VERIFIED METRICS
              </div>

              <h4 className="font-display font-semibold text-xs tracking-wider text-zinc-400 uppercase mb-8">
                MARK D STUDIO BY THE NUMBERS
              </h4>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                {data.stats.map((stat) => (
                  <div key={stat.id} className="border-b border-zinc-150 pb-4">
                    <span className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#1a1a1a] block tracking-tighter">
                      {stat.value}
                    </span>
                    <span className="font-sans text-[11px] tracking-wider text-zinc-500 uppercase font-medium">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-100 text-center sm:text-left">
                <span className="inline-flex items-center space-x-2 text-zinc-600 text-xs font-mono font-medium tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#1a1a1a]" />
                  <span>Licensed General Engineers & Registered Architects</span>
                </span>
              </div>
            </div>

            {/* Decorative Architectural Wireframe drawing representation */}
            <div className="hidden lg:block border border-dashed border-zinc-300 p-6 opacity-60">
              <div className="h-28 flex items-center justify-center font-mono text-[9px] text-zinc-400 select-none relative">
                <div className="absolute top-1 left-1 border-t border-l border-zinc-300 w-3 h-3" />
                <div className="absolute top-1 right-1 border-t border-r border-zinc-300 w-3 h-3" />
                <div className="absolute bottom-1 left-1 border-b border-l border-zinc-300 w-3 h-3" />
                <div className="absolute bottom-1 right-1 border-b border-r border-zinc-300 w-3 h-3" />
                <div className="w-full text-center space-y-1">
                  <div>[PLAN_VIEW_MDS_STRUCT_S2]</div>
                  <div>FORM FOLLOWS FUNCTION // PURE MONOCHROME</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
