import React, { useState, useEffect } from "react";
import { WebsiteContent, ProjectItem, ServiceItem, ProcessStep, WhyChooseUsItem, TestimonialItem } from "../types";
import { X, Save, Plus, Trash2, Mail, HelpCircle, Inbox, HelpCircle as HelpIcon, FileText } from "lucide-react";

interface CMSPanelProps {
  content: WebsiteContent;
  onSave: (updated: WebsiteContent) => void;
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export default function CMSPanel({ content, onSave, isOpen, onClose, initialTab = "hero" }: CMSPanelProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [localContent, setLocalContent] = useState<WebsiteContent>(content);
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  useEffect(() => {
    if (isOpen) {
      // Load form submissions from local storage
      const stored = JSON.parse(localStorage.getItem("mds_submissions") || "[]");
      setSubmissions(stored);
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  if (!isOpen) return null;

  const handleFieldChange = (section: string, field: string, value: any) => {
    setLocalContent((prev) => ({
      ...prev,
      [section]: {
        // @ts-ignore
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(localContent);
    alert("Website content updated successfully! (Saved to persistent local state)");
    onClose();
  };

  const handleResetToDefault = () => {
    if (window.confirm("Are you sure you want to reset all content to original architectural defaults? This will overwrite your custom modifications.")) {
      localStorage.removeItem("mds_website_content");
      window.location.reload();
    }
  };

  // Helper to edit array items (projects, services, process, etc)
  const updateArrayItem = (key: keyof WebsiteContent, itemId: string, updatedFields: any) => {
    setLocalContent((prev) => {
      const arr = prev[key] as any[];
      const updatedArr = arr.map((item) => (item.id === itemId ? { ...item, ...updatedFields } : item));
      return {
        ...prev,
        [key]: updatedArr
      };
    });
  };

  const removeArrayItem = (key: keyof WebsiteContent, itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLocalContent((prev) => {
        const arr = prev[key] as any[];
        return {
          ...prev,
          [key]: arr.filter((item) => item.id !== itemId)
        };
      });
    }
  };

  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: "New Architectural Concept Project",
      category: "Residential",
      location: "San Francisco, CA",
      description: "Provide short descriptive paragraphs summarizing structural characteristics, site programming, and layout elements of the project here.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      year: "2026",
      area: "4,500 sq. ft."
    };
    setLocalContent((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    setActiveTab("projects");
  };

  const deleteSubmission = (id: string) => {
    if (window.confirm("Are you sure you want to delete this client request?")) {
      const filtered = submissions.filter((s) => s.id !== id);
      localStorage.setItem("mds_submissions", JSON.stringify(filtered));
      setSubmissions(filtered);
    }
  };

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects Grid" },
    { id: "process", label: "Process Steps" },
    { id: "excellence", label: "Excellence" },
    { id: "testimonials", label: "Reviews" },
    { id: "contact", label: "Office Contacts" },
    { id: "inbox", label: "Client Inquiries" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs pointer-events-auto" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute top-0 right-0 h-full w-full max-w-xl md:max-w-2xl bg-white text-zinc-950 shadow-none flex flex-col border-l border-zinc-200 z-10">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-150 flex items-center justify-between bg-zinc-50">
          <div>
            <span className="font-mono text-[9px] text-[#1a1a1a]/60 tracking-[0.25em] uppercase font-bold block">
              MDS CONTENT PORTAL
            </span>
            <h2 className="font-display font-light text-lg text-[#1a1a1a] uppercase tracking-tight">
              ADMIN CMS TERMINAL
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetToDefault}
              className="text-zinc-550 hover:text-[#1a1a1a] font-mono text-[9px] uppercase tracking-widest px-3 py-2 border border-zinc-250 hover:border-[#1a1a1a] rounded-none transition duration-250"
              title="Reset website to original copy defaults"
            >
              Reset Defaults
            </button>
            <button onClick={onClose} className="p-2 text-zinc-400 hover:text-black hover:bg-zinc-100 rounded-none">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Outer Split Pane / Tab bar & Forms */}
        <div className="flex-1 overflow-hidden grid grid-cols-12">
          
          {/* Vertical Sidemenu Tabs (4 cols) */}
          <div className="col-span-4 bg-zinc-50 border-r border-zinc-200 py-4 flex flex-col overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-5 py-3.5 border-r-2 text-xs font-mono uppercase tracking-wider transition ${
                  activeTab === tab.id
                    ? "bg-white text-black border-zinc-950 font-bold"
                    : "text-zinc-505 hover:bg-zinc-100 border-transparent hover:text-zinc-900"
                } ${tab.id === 'inbox' && submissions.length > 0 ? "relative flex items-center justify-between" : ""}`}
              >
                <span>{tab.label}</span>
                {tab.id === 'inbox' && submissions.length > 0 && (
                  <span className="inline-block bg-zinc-900 text-white rounded-full px-1.5 py-0.5 text-[8px] font-bold text-center leading-none">
                    {submissions.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Form Content panel (8 cols) */}
          <div className="col-span-8 p-6 md:p-8 overflow-y-auto space-y-6">
            
            {/* TAB: HERO EDITING */}
            {activeTab === "hero" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Hero Section Content</h3>
                
                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Hero Headline Title</label>
                  <textarea
                    rows={3}
                    value={localContent.hero.headline}
                    onChange={(e) => handleFieldChange("hero", "headline", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                  <span className="text-[10px] text-zinc-400 block font-light">Sentences will break on periods (.)</span>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Hero Subheadline Text</label>
                  <textarea
                    rows={2}
                    value={localContent.hero.subheadline}
                    onChange={(e) => handleFieldChange("hero", "subheadline", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Primary Button Text</label>
                    <input
                      type="text"
                      value={localContent.hero.ctaTextPrimary}
                      onChange={(e) => handleFieldChange("hero", "ctaTextPrimary", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Secondary Button Text</label>
                    <input
                      type="text"
                      value={localContent.hero.ctaTextSecondary}
                      onChange={(e) => handleFieldChange("hero", "ctaTextSecondary", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Hero Background Image URL (Unsplash ID or path)</label>
                  <input
                    type="text"
                    value={localContent.hero.backgroundImageUrl}
                    onChange={(e) => handleFieldChange("hero", "backgroundImageUrl", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>
              </div>
            )}

            {/* TAB: ABOUT US */}
            {activeTab === "about" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">About Section Content</h3>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">About Section Title</label>
                  <input
                    type="text"
                    value={localContent.about.title}
                    onChange={(e) => handleFieldChange("about", "title", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">About Section Subtitle slogan</label>
                  <input
                    type="text"
                    value={localContent.about.subtitle}
                    onChange={(e) => handleFieldChange("about", "subtitle", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Main Organization Description</label>
                  <textarea
                    rows={5}
                    value={localContent.about.description}
                    onChange={(e) => handleFieldChange("about", "description", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950 leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Our Mission Statements</label>
                    <textarea
                      rows={4}
                      value={localContent.about.mission}
                      onChange={(e) => handleFieldChange("about", "mission", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Our Vision Statements</label>
                    <textarea
                      rows={4}
                      value={localContent.about.vision}
                      onChange={(e) => handleFieldChange("about", "vision", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Design Philosophy copy</label>
                  <textarea
                    rows={3}
                    value={localContent.about.philosophy}
                    onChange={(e) => handleFieldChange("about", "philosophy", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                {/* Edit Statistics list */}
                <div className="space-y-3 pt-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Key Performance Achievements (Statistics Metrics)</label>
                  {localContent.about.stats.map((stat, sIdx) => (
                    <div key={stat.id} className="grid grid-cols-12 gap-3 items-center border border-zinc-100 p-2.5 bg-zinc-50">
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={stat.value}
                          placeholder="e.g. 150+"
                          onChange={(e) => {
                            const updatedStats = [...localContent.about.stats];
                            updatedStats[sIdx].value = e.target.value;
                            handleFieldChange("about", "stats", updatedStats);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950 text-center font-mono font-bold"
                        />
                      </div>
                      <div className="col-span-8">
                        <input
                          type="text"
                          value={stat.label}
                          placeholder="e.g. Clients"
                          onChange={(e) => {
                            const updatedStats = [...localContent.about.stats];
                            updatedStats[sIdx].label = e.target.value;
                            handleFieldChange("about", "stats", updatedStats);
                          }}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950 font-medium"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Capabilities / Services</h3>

                {localContent.services.map((srv) => (
                  <div key={srv.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded-md space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[10px] text-zinc-400">{srv.id}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Service Name</label>
                        <input
                          type="text"
                          value={srv.title}
                          onChange={(e) => updateArrayItem("services", srv.id, { title: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs outline-none focus:border-zinc-950 font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Icon Name (Lucide components)</label>
                        <input
                          type="text"
                          value={srv.iconName}
                          onChange={(e) => updateArrayItem("services", srv.id, { iconName: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs outline-none focus:border-zinc-950 font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block">Description Summary</label>
                      <textarea
                        rows={2}
                        value={srv.description}
                        onChange={(e) => updateArrayItem("services", srv.id, { description: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs outline-none focus:border-zinc-950"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block font-bold">Key Sub-Capabilities (Comma separated)</label>
                      <input
                        type="text"
                        value={srv.features.join(", ")}
                        onChange={(e) => {
                          const features = e.target.value.split(",").map((f) => f.trim()).filter(Boolean);
                          updateArrayItem("services", srv.id, { features });
                        }}
                        className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs outline-none focus:border-zinc-950"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PROJECTS */}
            {activeTab === "projects" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase">Portfolio Gallery Projects</h3>
                  <button
                    onClick={addProject}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-zinc-950 text-white hover:bg-black rounded text-[10px] font-mono uppercase tracking-wider transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                {localContent.projects.map((proj) => (
                  <div key={proj.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded space-y-4 relative">
                    <button
                      onClick={() => removeArrayItem("projects", proj.id)}
                      className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-red-600 rounded bg-white border border-zinc-150 transition shadow"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-start">
                      <img src={proj.imageUrl} alt="" className="w-16 h-12 object-cover border border-zinc-200 rounded mr-4" />
                      <div className="space-y-1">
                        <span className="font-mono text-[8px] text-zinc-400 block">ID: {proj.id}</span>
                        <h4 className="font-display font-bold text-xs text-zinc-900 uppercase">{proj.name}</h4>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Project Headline</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => updateArrayItem("projects", proj.id, { name: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950 font-bold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Category division</label>
                        <select
                          value={proj.category}
                          onChange={(e) => updateArrayItem("projects", proj.id, { category: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950"
                        >
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Interior">Interior</option>
                          <option value="Construction">Construction</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Location</label>
                        <input
                          type="text"
                          value={proj.location}
                          onChange={(e) => updateArrayItem("projects", proj.id, { location: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Completion Year</label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => updateArrayItem("projects", proj.id, { year: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-1.5 text-xs outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Built Area</label>
                        <input
                          type="text"
                          value={proj.area}
                          onChange={(e) => updateArrayItem("projects", proj.id, { area: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-1.5 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block">Featured Image URL</label>
                      <input
                        type="text"
                        value={proj.imageUrl}
                        onChange={(e) => updateArrayItem("projects", proj.id, { imageUrl: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block">Detailed Description Text</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => updateArrayItem("projects", proj.id, { description: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PROCESS STEPS */}
            {activeTab === "process" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Service Process Stages</h3>

                {localContent.process.map((step) => (
                  <div key={step.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded space-y-3">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-2 space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Step Number</label>
                        <input
                          type="text"
                          value={step.stepNumber}
                          onChange={(e) => updateArrayItem("process", step.id, { stepNumber: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none text-center font-bold"
                        />
                      </div>
                      <div className="col-span-10 space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block font-bold">Step Name</label>
                        <input
                          type="text"
                          value={step.name}
                          onChange={(e) => updateArrayItem("process", step.id, { name: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Estimated Duration</label>
                        <input
                          type="text"
                          value={step.timelineEstimate}
                          onChange={(e) => updateArrayItem("process", step.id, { timelineEstimate: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Step Description</label>
                        <textarea
                          rows={2}
                          value={step.description}
                          onChange={(e) => updateArrayItem("process", step.id, { description: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2.5 text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: EXCELLENCE (WHY CHOOSE US) */}
            {activeTab === "excellence" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Why Choose Us Differentiators</h3>

                {localContent.whyChooseUs.map((item) => (
                  <div key={item.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block font-bold">Differentiator Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateArrayItem("whyChooseUs", item.id, { title: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Icon Component Name</label>
                        <input
                          type="text"
                          value={item.iconName}
                          onChange={(e) => updateArrayItem("whyChooseUs", item.id, { iconName: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block">Descriptive Details</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateArrayItem("whyChooseUs", item.id, { description: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === "testimonials" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Testimonials & Reviews</h3>

                {localContent.testimonials.map((test) => (
                  <div key={test.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block font-bold">Client Name</label>
                        <input
                          type="text"
                          value={test.clientName}
                          onChange={(e) => updateArrayItem("testimonials", test.id, { clientName: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Role Description</label>
                        <input
                          type="text"
                          value={test.role}
                          onChange={(e) => updateArrayItem("testimonials", test.id, { role: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Project Title reference</label>
                        <input
                          type="text"
                          value={test.projectType}
                          onChange={(e) => updateArrayItem("testimonials", test.id, { projectType: e.target.value })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-mono text-[8px] uppercase text-zinc-400 block">Rating Score (1-5)</label>
                        <input
                          type="number"
                          min={1}
                          max={5}
                          value={test.rating}
                          onChange={(e) => updateArrayItem("testimonials", test.id, { rating: parseInt(e.target.value) || 5 })}
                          className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase text-zinc-400 block">Client Quote Text</label>
                      <textarea
                        rows={3}
                        value={test.quote}
                        onChange={(e) => updateArrayItem("testimonials", test.id, { quote: e.target.value })}
                        className="w-full bg-white border border-zinc-200 rounded p-2 text-xs outline-none focus:border-zinc-950 italic"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: CONTACT DETAILS */}
            {activeTab === "contact" && (
              <div className="space-y-5">
                <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase border-b border-zinc-100 pb-2">Office Locations & Coordinates</h3>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Studio Office Postal Address</label>
                  <input
                    type="text"
                    value={localContent.contact.address}
                    onChange={(e) => handleFieldChange("contact", "address", e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Inquiries Phone</label>
                    <input
                      type="text"
                      value={localContent.contact.phone}
                      onChange={(e) => handleFieldChange("contact", "phone", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Inquiries Email</label>
                    <input
                      type="text"
                      value={localContent.contact.email}
                      onChange={(e) => handleFieldChange("contact", "email", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">WhatsApp Direct Number (Format only numbers)</label>
                    <input
                      type="text"
                      value={localContent.contact.whatsappNumber}
                      onChange={(e) => handleFieldChange("contact", "whatsappNumber", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950 font-mono"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase text-zinc-400 block font-bold">Office Availability hours</label>
                    <input
                      type="text"
                      value={localContent.contact.officeHours}
                      onChange={(e) => handleFieldChange("contact", "officeHours", e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded p-3 text-xs outline-none focus:border-zinc-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border border-zinc-100 p-3 bg-zinc-50">
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] uppercase text-zinc-400 block">CAD LATITUDE</label>
                    <input
                      type="number"
                      step="any"
                      value={localContent.contact.coordinates.lat}
                      onChange={(e) => {
                        const coords = { ...localContent.contact.coordinates, lat: parseFloat(e.target.value) || 0 };
                        handleFieldChange("contact", "coordinates", coords);
                      }}
                      className="w-full bg-white border border-zinc-250 rounded p-2 text-xs outline-none font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[8px] uppercase text-zinc-400 block">CAD LONGITUDE</label>
                    <input
                      type="number"
                      step="any"
                      value={localContent.contact.coordinates.lng}
                      onChange={(e) => {
                        const coords = { ...localContent.contact.coordinates, lng: parseFloat(e.target.value) || 0 };
                        handleFieldChange("contact", "coordinates", coords);
                      }}
                      className="w-full bg-white border border-zinc-250 rounded p-2 text-xs outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INBOX (SAVED CLIENT SUBMISSIONS) */}
            {activeTab === "inbox" && (
              <div className="space-y-5">
                <div className="border-b border-zinc-100 pb-2">
                  <h3 className="font-display font-semibold text-sm text-zinc-900 uppercase flex items-center space-x-2">
                    <Inbox className="w-4 h-4 text-zinc-800" />
                    <span>Client Inquiries Inbox</span>
                  </h3>
                  <p className="font-sans text-[11px] text-zinc-500 mt-1 block leading-relaxed">
                    Messages submitted via the contact form are stored below. This works completely client-side.
                  </p>
                </div>

                {submissions.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-zinc-200 p-6 rounded text-zinc-400">
                    <Mail className="w-8 h-8 mx-auto mb-3 text-zinc-350" />
                    <p className="font-mono text-xs uppercase tracking-wider">Inboxes empty</p>
                    <p className="font-sans text-xs text-zinc-400 mt-1">No forms have been sent on this device yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((sub) => (
                      <div key={sub.id} className="p-4 border border-zinc-200 bg-zinc-50 rounded space-y-4 relative">
                        <button
                          onClick={() => deleteSubmission(sub.id)}
                          className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 p-1 rounded"
                          title="Delete submission logs"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] text-zinc-400 block">{new Date(sub.date).toLocaleString()}</span>
                          <h4 className="font-display font-bold text-xs uppercase text-zinc-900 flex items-center space-x-2">
                            <span>FROM: {sub.name}</span>
                            <span className="text-zinc-300">|</span>
                            <span className="text-zinc-550 font-sans font-light capitalize text-[10px]">{sub.email}</span>
                          </h4>
                          {sub.subject && (
                            <p className="font-sans text-xs font-semibold text-zinc-800">
                              Subject: {sub.subject}
                            </p>
                          )}
                        </div>

                        <div className="border-t border-zinc-200/50 pt-3">
                          <p className="font-sans text-xs text-zinc-650 bg-white p-3 border border-zinc-150 rounded whitespace-pre-wrap leading-relaxed">
                            {sub.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="p-6 border-t border-zinc-150 bg-zinc-50 flex items-center justify-between">
          <span className="font-mono text-[9px] text-zinc-400 block tracking-widest uppercase">
            Saves directly to browser LocalStorage
          </span>
          
          <button
            onClick={handleSave}
            className="bg-[#1a1a1a] hover:bg-black text-white font-medium text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-none flex items-center space-x-2.5 transition cursor-pointer border border-[#1a1a1a] shadow-none"
          >
            <Save className="w-4 h-4" />
            <span>Apply Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
