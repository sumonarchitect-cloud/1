import React from "react";
import { WhyChooseUsItem } from "../types";
import LucideIcon from "./LucideIcon";
import { Edit3, CheckCircle2 } from "lucide-react";

interface WhyChooseUsProps {
  items: WhyChooseUsItem[];
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function WhyChooseUs({ items, isCmsActive, onEdit }: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 bg-white border-b border-zinc-200 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editor triggers */}
        {isCmsActive && (
          <div className="absolute top-0 right-0 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex items-center space-x-1.5 bg-[#1a1a1a] text-white shadow-none px-4 py-2 hover:bg-black font-mono text-xs uppercase tracking-wider rounded-none border border-[#1a1a1a] transition duration-300 pointer-events-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Configure Differentiators</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              05 // EXCELLENCE
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              WHY CHOOSE MARK D STUDIO
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // CREED:05C
          </span>
        </div>

        {/* Section Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left panel: Monolithic architectural quote with dark scheme (4 cols) */}
          <div className="lg:col-span-4 bg-[#1a1a1a] text-white p-8 md:p-12 flex flex-col justify-between border border-[#1a1a1a] shadow-none rounded-none relative min-h-[350px]">
            {/* Corner wireframe bracket drawing elements */}
            <div className="absolute top-4 left-4 border-t border-l border-white/20 w-4 h-4 rounded-none" />
            <div className="absolute top-4 right-4 border-t border-r border-white/20 w-4 h-4 rounded-none" />
            <div className="absolute bottom-4 left-4 border-b border-l border-white/20 w-4 h-4 rounded-none" />
            <div className="absolute bottom-4 right-4 border-b border-r border-white/20 w-4 h-4 rounded-none" />
            
            <div>
              <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-400 uppercase block mb-8">
                MDS CREED STANDARD
              </span>
              <p className="font-display text-2xl md:text-3xl font-light tracking-tight text-white leading-snug">
                "Precision in engineering. Pure elegance in form. Total peace of mind, from layout to handing."
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 mt-8">
              <span className="font-mono text-[9px] text-zinc-400 block tracking-widest">
                ESTABLISHED INTEGRITY // SF, CA
              </span>
            </div>
          </div>

          {/* Right panel: Modern features layout (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="p-6 md:p-8 bg-[#f5f5f5] border border-zinc-200 hover:border-[#1a1a1a] hover:bg-white transition duration-300 flex flex-col justify-between group rounded-none shadow-none"
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="p-3 bg-white border border-zinc-200 text-[#1a1a1a] rounded-none group-hover:bg-[#1a1a1a] group-hover:text-white transition duration-300">
                      <LucideIcon name={item.iconName} className="w-5 h-5" />
                    </div>

                    <div>
                      {/* Title */}
                      <h3 className="font-display font-medium text-base text-zinc-950 group-hover:text-black mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="font-sans font-light text-xs text-zinc-500 leading-relaxed block">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider">MDS CERTIFIED QUALITY CODE</span>
                    <CheckCircle2 className="w-4 h-4 text-[#1a1a1a]/65" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
