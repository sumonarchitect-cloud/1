import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Process from "./components/Process";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CMSPanel from "./components/CMSPanel";
import { initialContent } from "./initialContent";
import { WebsiteContent } from "./types";
import { Settings2, ShieldCheck, HelpCircle } from "lucide-react";

export default function App() {
  const [content, setContent] = useState<WebsiteContent>(initialContent);
  const [isCmsActive, setIsCmsActive] = useState<boolean>(false);
  const [isCmsOpen, setIsCmsOpen] = useState<boolean>(false);
  const [cmsInitialTab, setCmsInitialTab] = useState<string>("hero");

  // Load content from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mds_website_content");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge or validate to make sure any missing schema keys don't break page
        setContent((prev) => ({
          ...prev,
          ...parsed,
          hero: { ...prev.hero, ...parsed.hero },
          about: { ...prev.about, ...parsed.about },
          contact: { ...prev.contact, ...parsed.contact }
        }));
      }
    } catch (err) {
      console.error("Could not load local storage website content", err);
    }
  }, []);

  // Save updated content
  const handleSaveContent = (updatedContent: WebsiteContent) => {
    try {
      setContent(updatedContent);
      localStorage.setItem("mds_website_content", JSON.stringify(updatedContent));
    } catch (err) {
      console.error("Failed to commit content to local storage", err);
    }
  };

  const handleOpenCmsTab = (tabId: string) => {
    setCmsInitialTab(tabId);
    setIsCmsOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-50 flex flex-col font-sans select-text">
      
      {/* Floating Global CMS Editor helper badge */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            setIsCmsActive(!isCmsActive);
            if (!isCmsActive) {
              handleOpenCmsTab("hero");
            }
          }}
          className={`flex items-center space-x-2.5 shadow-none border px-5 py-3 rounded-none text-xs font-mono tracking-widest uppercase transition-all duration-300 pointer-events-auto ${
            isCmsActive
              ? "bg-[#1a1a1a] hover:bg-black border-[#1a1a1a] text-white"
              : "bg-white hover:bg-zinc-50 border-zinc-300 text-zinc-900"
          }`}
          title="Click to toggle Admin CMS mode"
        >
          {isCmsActive ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>CMS Editor: ON</span>
            </>
          ) : (
            <>
              <Settings2 className="w-4 h-4 text-zinc-600 hover:rotate-45 duration-300" />
              <span>Enable CMS mode</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Info Guide when CMS mode is active */}
      {isCmsActive && (
        <div className="fixed bottom-22 right-6 z-40 bg-white text-[#1a1a1a] border border-[#1a1a1a] px-4 py-2.5 shadow-none max-w-xs text-[10px] uppercase font-mono tracking-widest rounded-none hidden sm:block animate-bounce">
          <p className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-none bg-[#1a1a1a] animate-pulse" />
            <span>Click any "Edit Section" tag to configure text copy!</span>
          </p>
        </div>
      )}

      {/* Header element */}
      <Header
        isCmsActive={isCmsActive}
        setIsCmsActive={setIsCmsActive}
        onOpenConsultation={() => scrollToSection("#contact")}
      />

      {/* Hero section */}
      <Hero
        data={content.hero}
        isCmsActive={isCmsActive}
        onEdit={() => handleOpenCmsTab("hero")}
        onViewProjects={() => scrollToSection("#projects")}
        onGetConsultation={() => scrollToSection("#contact")}
      />

      {/* Main Structural divisions */}
      <main className="flex-1">
        
        {/* About section */}
        <About
          data={content.about}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("about")}
        />

        {/* Services / Capabilities section */}
        <Services
          items={content.services}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("services")}
        />

        {/* Featured Projects Portfolio section */}
        <Projects
          items={content.projects}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("projects")}
        />

        {/* Workflow Process steps */}
        <Process
          steps={content.process}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("process")}
        />

        {/* Why choose MARK D STUDIO */}
        <WhyChooseUs
          items={content.whyChooseUs}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("excellence")}
        />

        {/* Testimonials */}
        <Testimonials
          items={content.testimonials}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("testimonials")}
        />

        {/* Contact form & offices map details */}
        <Contact
          data={content.contact}
          isCmsActive={isCmsActive}
          onEdit={() => handleOpenCmsTab("contact")}
        />
        
      </main>

      {/* Footer copyright rows */}
      <Footer
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        quickServices={content.services.slice(0, 4).map((s) => s.title)}
      />

      {/* Slide-out CMS content panel */}
      <CMSPanel
        content={content}
        onSave={handleSaveContent}
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        initialTab={cmsInitialTab}
      />
    </div>
  );
}
