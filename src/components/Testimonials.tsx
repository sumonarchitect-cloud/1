import React, { useState } from "react";
import { TestimonialItem } from "../types";
import { Edit3, Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

interface TestimonialsProps {
  items: TestimonialItem[];
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function Testimonials({ items, isCmsActive, onEdit }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-[#f5f5f5] border-b border-zinc-200 overflow-hidden">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

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
              <span>Configure Testimonials</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              06 // REVIEWS
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              CLIENT TESTIMONIALS
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // CODE:TST-03
          </span>
        </div>

        {/* Elegant Editorial Carousell/Card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-[#1a1a1a]">
          {/* Quote Graphic block (3 cols) */}
          <div className="lg:col-span-3 hidden lg:flex flex-col items-center justify-center p-8 border-r border-zinc-200">
            <div className="p-6 bg-[#1a1a1a] text-white rounded-none mb-6">
              <Quote className="w-8 h-8" />
            </div>
            <p className="font-display text-sm text-zinc-450 text-center tracking-wide font-light">
              HIGHLY VALUED CLIENT FEEDBACK
            </p>
          </div>

          {/* Core Quotes block (9 cols with navigation controls) */}
          <div className="lg:col-span-9 space-y-10 pl-0 lg:pl-12">
            {items.length > 0 && (
              <div className="relative min-h-[220px] flex flex-col justify-between">
                <div>
                  {/* Star Ratings */}
                  <div className="flex items-center space-x-1 mb-6 text-[#1a1a1a]">
                    {Array.from({ length: items[activeIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#1a1a1a] stroke-[#1a1a1a]" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="font-display text-lg sm:text-xl md:text-2xl font-light tracking-wide text-zinc-800 leading-relaxed mb-8 italic">
                    "{items[activeIndex].quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-200 pt-6 gap-4">
                  <div>
                    <h4 className="font-display font-medium text-sm text-zinc-950 uppercase tracking-wider">
                      {items[activeIndex].clientName}
                    </h4>
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mt-1">
                      {items[activeIndex].role} // {items[activeIndex].projectType}
                    </span>
                  </div>

                  {/* Carousel Controllers */}
                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <button
                      onClick={handlePrev}
                      className="p-3 border border-zinc-200 bg-white hover:border-[#1a1a1a] text-zinc-600 hover:text-black rounded-none transition duration-305"
                      title="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="font-mono text-xs text-zinc-400 tracking-widest select-none">
                      {activeIndex + 1} / {items.length}
                    </span>

                    <button
                      onClick={handleNext}
                      className="p-3 border border-zinc-200 bg-white hover:border-[#1a1a1a] text-zinc-600 hover:text-black rounded-none transition duration-305"
                      title="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
