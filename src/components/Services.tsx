import React from "react";
import { ServiceItem } from "../types";
import LucideIcon from "./LucideIcon";
import { Edit3, ArrowUpRight } from "lucide-react";

interface ServicesProps {
  items: ServiceItem[];
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function Services({ items, isCmsActive, onEdit }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-[#f5f5f5] border-b border-zinc-200"
    >
      {/* Background Grid Lines to represent planning sheets */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-zinc-200/40 to-transparent pointer-events-none" />
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
              className="flex items-center space-x-1.5 bg-[#1a1a1a] text-white shadow-none border border-[#1a1a1a] px-4 py-2 hover:bg-black font-mono text-xs uppercase tracking-wider rounded-none transition duration-300 pointer-events-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Configure Services</span>
            </button>
          </div>
        )}

        {/* Section Heading */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              02 // CAPABILITIES
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              OUR CORE SERVICES
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // CODE:SRV-08
          </span>
        </div>

        {/* Services Grid (4 Columns/Cards on LG screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((srv, index) => (
            <div
              key={srv.id}
              className="group bg-white border border-zinc-200 p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#1a1a1a] rounded-none relative overflow-hidden"
            >
              {/* Top Card indicator numbers in font-mono */}
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-xs text-zinc-300 group-hover:text-zinc-600 transition duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="text-zinc-400 group-hover:text-zinc-950 transform group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div>
                {/* Dynamic Icon */}
                <div className="text-[#1a1a1a] bg-[#f5f5f5] p-3.5 w-max rounded-none mb-6 group-hover:bg-[#1a1a1a] group-hover:text-white transition duration-300">
                  <LucideIcon name={srv.iconName} className="w-5 h-5" />
                </div>

                {/* Service Name */}
                <h3 className="font-display font-semibold text-lg text-zinc-900 group-hover:text-black mb-3">
                  {srv.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans font-light text-xs text-zinc-500 leading-relaxed mb-6 block">
                  {srv.description}
                </p>
              </div>

              {/* Bullet features displayed on hover / at the bottom */}
              <div className="border-t border-zinc-100 pt-4 mt-4">
                <ul className="space-y-1.5">
                  {srv.features?.slice(0, 3).map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2 text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                      <span className="h-1 w-1 bg-[#1a1a1a]/40 rounded-none" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
