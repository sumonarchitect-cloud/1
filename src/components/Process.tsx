import React, { useState } from "react";
import { ProcessStep } from "../types";
import { Edit3, ArrowRight, Play, CheckCircle } from "lucide-react";

interface ProcessProps {
  steps: ProcessStep[];
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function Process({ steps, isCmsActive, onEdit }: ProcessProps) {
  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);

  return (
    <section id="process" className="relative py-24 md:py-32 bg-[#f5f5f5] border-b border-zinc-200 overflow-hidden">
      {/* Background Architectural Grid Lines */}
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
              className="flex items-center space-x-1.5 bg-[#1a1a1a] text-white shadow-none px-4 py-2 hover:bg-black font-mono text-xs uppercase tracking-wider rounded-none border border-[#1a1a1a] transition duration-300 pointer-events-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Configure Process Flow</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              04 // WORKFLOW
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              OUR SERVICE PROCESS
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // PROC:05S
          </span>
        </div>

        {/* Step Progression Timeline (Responsive layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative text-[#1a1a1a]">
          {/* Connector horizontal line on Desktop */}
          <div className="absolute top-20 left-6 right-6 h-[1.5px] bg-zinc-300/80 hidden lg:block z-0" />

          {steps.map((step, index) => {
            const isHovered = hoveredStepIndex === index;
            return (
              <div
                key={step.id}
                onMouseEnter={() => setHoveredStepIndex(index)}
                onMouseLeave={() => setHoveredStepIndex(null)}
                className={`relative z-10 bg-white border border-zinc-200 p-8 flex flex-col justify-between transition-all duration-300 min-h-[290px] rounded-none shadow-none ${
                  isHovered ? "border-[#1a1a1a]" : "hover:border-zinc-400"
                }`}
              >
                {/* Step Circle & Number (Razor Sharp Square) */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`h-11 w-11 rounded-none flex items-center justify-center font-display font-bold text-sm tracking-tighter border transition duration-300 ${
                      isHovered
                        ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                        : "bg-zinc-100 text-zinc-800 border-zinc-200"
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  
                  {/* Step Timeline Indicator */}
                  <span className="font-mono text-[9px] uppercase tracking-widest bg-zinc-100/90 text-zinc-500 px-2.5 py-1 rounded-none border border-zinc-200/50">
                    {step.timelineEstimate}
                  </span>
                </div>

                {/* Content Block */}
                <div>
                  <h3 className="font-display font-semibold text-lg text-zinc-900 group-hover:text-black mb-3">
                    {step.name}
                  </h3>

                  <p className="font-sans font-light text-xs text-zinc-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Vertical marker for active/completed visualization */}
                <div className="flex justify-end pt-4 mt-4 border-t border-zinc-100">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center space-x-1">
                    {index === steps.length - 1 ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-[#1a1a1a]" />
                        <span>Ready</span>
                      </>
                    ) : (
                      <>
                        <span>Next Step</span>
                        <ArrowRight className="w-3 h-3" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
