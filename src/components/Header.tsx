import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Menu, X, Settings2, ShieldCheck, HelpCircle } from "lucide-react";

interface HeaderProps {
  isCmsActive: boolean;
  setIsCmsActive: (active: boolean) => void;
  onOpenConsultation: () => void;
}

export default function Header({ isCmsActive, setIsCmsActive, onOpenConsultation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Process", href: "#process" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Contact", href: "#contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-zinc-200 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, "#")}
            className="flex items-center group transition duration-300"
          >
            <Logo className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 font-sans text-xs tracking-widest uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors duration-300 relative py-1 group ${
                  isScrolled ? "text-zinc-700 hover:text-black" : "text-zinc-600 hover:text-black"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Header Controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CMS Trigger Switch */}
            <button
              onClick={() => setIsCmsActive(!isCmsActive)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-none text-[11px] font-mono tracking-wider uppercase transition-all duration-300 ${
                isCmsActive
                  ? "bg-black text-white hover:bg-zinc-800"
                  : "bg-zinc-100 text-[#1a1a1a] hover:bg-zinc-200 border border-zinc-200"
              }`}
              title="Toggle CMS Editor Mode"
            >
              {isCmsActive ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CMS Mode: Active</span>
                </>
              ) : (
                <>
                  <Settings2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>CMS Editor</span>
                </>
              )}
            </button>

            {/* Principal CTA - Razor Sharp Rounded-None Button */}
            <button
              onClick={onOpenConsultation}
              className="bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90 font-semibold text-xs tracking-widest uppercase px-6 py-2.5 transition duration-300 border border-[#1a1a1a] rounded-none font-sans"
            >
              Consultation
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center space-x-3">
            {/* Minimal CMS switch for phone */}
            <button
              onClick={() => setIsCmsActive(!isCmsActive)}
              className={`p-2 rounded-full transition duration-300 ${
                isCmsActive ? "bg-black text-white" : "bg-zinc-100 text-zinc-700 border border-zinc-200"
              }`}
              title="Toggle CMS Mode"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-900 focus:outline-none p-1.5"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation Drawer */}
      <div
        className={`fixed inset-0 z-30 transition-all duration-300 lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />

        {/* Drawer Body */}
        <div
          className={`absolute top-0 right-0 h-full w-[300px] bg-white text-zinc-900 p-8 shadow-2xl transition-transform duration-300 transform flex flex-col justify-between ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div>
            <div className="flex items-center justify-between pb-8 border-b border-zinc-100">
              <span className="font-display font-bold text-sm tracking-widest text-zinc-800">NAVIGATION</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-6 mt-8 font-sans text-sm tracking-widest uppercase font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-zinc-700 hover:text-black py-1 border-b border-zinc-50"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setIsCmsActive(!isCmsActive);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-center space-x-2 p-3 font-mono text-xs tracking-wider uppercase rounded-none transition duration-300 ${
                isCmsActive ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-800 border border-zinc-200"
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>{isCmsActive ? "CMS Mode: Engaged" : "Activate CMS Mode"}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-[#1a1a1a] hover:bg-black text-white font-semibold text-xs tracking-widest uppercase py-3 border border-[#1a1a1a] font-sans rounded-none transition-all"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
