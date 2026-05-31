import React, { useState } from "react";
import { ProjectItem } from "../types";
import { Edit3, MapPin, Calendar, PlusCircle, Maximize2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectsProps {
  items: ProjectItem[];
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function Projects({ items, isCmsActive, onEdit }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const categories = ["All", "Residential", "Commercial", "Interior", "Construction"];

  const filteredProjects = selectedCategory === "All"
    ? items
    : items.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-white border-b border-zinc-200">
      {/* Background grid representation */}
      <div className="absolute inset-y-0 right-1/4 w-[1px] bg-zinc-100 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-zinc-100 pointer-events-none" />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Editor triggers */}
        {isCmsActive && (
          <div className="absolute top-0 right-0 z-20 flex space-x-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex items-center space-x-1.5 bg-[#1a1a1a] text-white shadow-none px-4 py-2 hover:bg-black font-mono text-xs uppercase tracking-wider rounded-none transition duration-300 pointer-events-auto"
            >
              <Edit3 className="w-3.5 h-3.5 text-zinc-300" />
              <span>Project Manager (CMS)</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-200 pb-6 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              03 // WORKS PORTFOLIO
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              FEATURED PROJECTS
            </h2>
          </div>

          {/* Filter Categories - Crisp Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3 font-mono text-[11px] tracking-wider uppercase font-semibold">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 border transition-all duration-300 rounded-none ${
                  selectedCategory === cat
                    ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                    : "bg-transparent text-zinc-500 border-zinc-200 hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid with Animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="group relative cursor-pointer flex flex-col justify-between border border-zinc-200 bg-white p-4 hover:border-[#1a1a1a] transition duration-300 rounded-none shadow-none"
                onClick={() => setActiveProject(project)}
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 mb-6 border border-zinc-200/55 rounded-none">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-100 duration-700 transition"
                  />
                  
                  {/* Category Accent Badge */}
                  <span className="absolute top-4 left-4 bg-[#1a1a1a] text-white font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded-none">
                    {project.category}
                  </span>

                  {/* Corner Maximize Icon */}
                  <div className="absolute bottom-4 right-4 bg-white text-[#1a1a1a] p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-none border border-zinc-200">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Info block */}
                <div className="pb-2">
                  <div className="flex items-center space-x-1.5 text-zinc-400 font-mono text-[10px] uppercase mb-2">
                    <MapPin className="w-3 h-3 text-[#1a1a1a]/50" />
                    <span>{project.location}</span>
                    <span className="text-zinc-200">•</span>
                    <Calendar className="w-3 h-3 text-[#1a1a1a]/50" />
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-zinc-900 group-hover:text-black mb-2 transition">
                    {project.name}
                  </h3>

                  <p className="font-sans font-light text-xs text-zinc-500 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Project Details Modal dialog */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing sheet */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white text-zinc-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-none border border-[#1a1a1a] grid grid-cols-1 md:grid-cols-12 rounded-none"
              >
                {/* Image side (6 cols) */}
                <div className="md:col-span-7 bg-zinc-900 h-64 md:h-auto min-h-[300px] relative">
                  <img
                    src={activeProject.imageUrl}
                    alt={activeProject.name}
                    className="w-full h-full object-cover grayscale contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Spec side (5 cols) */}
                <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    {/* Close triggers */}
                    <button
                      onClick={() => setActiveProject(null)}
                      className="absolute top-6 right-6 text-zinc-400 hover:text-black p-1 transition rounded-none"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <span className="font-mono text-xs text-[#1a1a1a]/60 tracking-widest uppercase block mb-2">
                      {activeProject.category} // PORTFOLIO SPEC
                    </span>

                    <h3 className="font-display font-light text-2xl tracking-tight text-zinc-950 mb-6 uppercase border-l-4 border-[#1a1a1a] pl-4">
                      {activeProject.name}
                    </h3>

                    <p className="font-sans font-light text-sm text-zinc-650 leading-relaxed mb-8">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Metadata Specs */}
                  <div className="border-t border-zinc-200 pt-6 space-y-4">
                    <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">LOCATION</span>
                      <span className="font-sans text-xs font-semibold text-zinc-700">{activeProject.location}</span>
                    </div>

                    <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase">COMPLETION YEAR</span>
                      <span className="font-sans text-xs font-semibold text-zinc-700">{activeProject.year}</span>
                    </div>

                    {activeProject.area && (
                      <div className="flex justify-between items-baseline border-b border-zinc-100 pb-2">
                        <span className="font-mono text-[10px] text-zinc-400 uppercase">BUILT AREA</span>
                        <span className="font-sans text-xs font-semibold text-zinc-700">{activeProject.area}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
