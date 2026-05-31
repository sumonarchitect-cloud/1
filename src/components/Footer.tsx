import React from "react";
import Logo from "./Logo";
import { Linkedin, Instagram, Facebook, ArrowUp, Mail, Phone } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
  quickServices: string[];
}

export default function Footer({ onScrollToTop, quickServices }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navLinks = [
    { name: "About Studio", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Works Library", href: "#projects" },
    { name: "Service Process", href: "#process" },
    { name: "Why Mark D", href: "#why-choose-us" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Inquire Now", href: "#contact" }
  ];

  return (
    <footer className="relative bg-[#1a1a1a] text-[#f5f5f5]/85 py-16 md:py-24 border-t border-[#1a1a1a] overflow-hidden font-sans">
      {/* Background Subtle Grid overlay */}
      <div className="absolute inset-0 grid-overlay-dark opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Core Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20 items-start pb-16 md:pb-20 border-b border-zinc-800">
          
          {/* Logo & Info column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Logo className="h-11 w-auto" inverse={true} />
            <p className="text-zinc-400 text-xs font-light leading-relaxed pt-2">
              MARK D STUDIO combines world-class architectural layout planning, elite modern interiors, and rigorous construction management into a seamless turnkey experience.
            </p>
            
            {/* Social channels */}
            <div className="flex items-center space-x-3 pt-4">
              <a href="#" className="p-2.5 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-none transition duration-300">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-none transition duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/markdstudio"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-zinc-900 hover:bg-white text-zinc-400 hover:text-zinc-950 rounded-none transition duration-300"
                title="Follow MARK d STUDIO on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display font-medium text-white text-xs tracking-wider uppercase mb-2">
              QUICK SECTIONS
            </h4>
            <ul className="space-y-3 font-medium text-xs">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-white text-zinc-400 transition-colors duration-250 block py-1"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-display font-medium text-white text-xs tracking-wider uppercase mb-2">
              STUDIO CAPABILITIES
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              {quickServices.map((service, idx) => (
                <li key={idx} className="block py-1">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to Top Circle block (2 cols) */}
          <div className="lg:col-span-2 h-full flex items-start justify-start lg:justify-end">
            <button
              onClick={onScrollToTop}
              className="group border border-zinc-800 hover:border-white p-4 text-zinc-500 hover:text-white flex items-center justify-center transition duration-305 rounded-none"
              title="Scroll back to top elevation"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition duration-300" />
            </button>
          </div>
        </div>

        {/* Legal copyrights line */}
        <div className="flex flex-col md:flex-row items-center justify-between text-[11px] font-mono text-zinc-650 pt-10 gap-4">
          <div>
            <span>© {currentYear} MARK D STUDIO. ALL RIGHTS RESERVED. INVENTIVE SPACES. PRECISE SYSTEMS.</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">PRIVACY PLAN</a>
            <span>//</span>
            <a href="#" className="hover:text-white">STRUCT SEC_09</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
