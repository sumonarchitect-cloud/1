import React, { useState } from "react";
import { ContactData } from "../types";
import { Edit3, MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ChevronRight } from "lucide-react";

interface ContactProps {
  data: ContactData;
  isCmsActive: boolean;
  onEdit: () => void;
}

export default function Contact({ data, isCmsActive, onEdit }: ContactProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill out Name, Email, and Message fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate sending message + save message in localStorage so we can display it in our Admin dashboard panel
    setTimeout(() => {
      try {
        const storedSubmissions = JSON.parse(localStorage.getItem("mds_submissions") || "[]");
        const newSubmission = {
          id: `sub-${Date.now()}`,
          date: new Date().toISOString(),
          ...formState
        };
        localStorage.setItem("mds_submissions", JSON.stringify([newSubmission, ...storedSubmissions]));
        
        setIsSubmitting(false);
        setSuccess(true);
        setFormState({ name: "", email: "", subject: "", message: "" });

        // Reset success indicator after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        setIsSubmitting(false);
        setSuccess(true);
      }
    }, 1200);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent("Hello MARK D STUDIO, I am interested in seeking an architectural/interior consultation. Please get back to me.");
    return `https://wa.me/${data.whatsappNumber}?text=${text}`;
  };

  const getGoogleMapsSearchUrl = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`;
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-white border-b border-zinc-200">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-100 to-transparent pointer-events-none" />
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
              <span>Configure Contact Info</span>
            </button>
          </div>
        )}

        {/* Section Heading Tag */}
        <div className="mb-16 md:mb-24 flex items-baseline justify-[#1a1a1a] justify-between border-b border-zinc-200 pb-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[#1a1a1a]/60 uppercase block mb-3">
              07 // CONNECTION
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl tracking-tight text-[#1a1a1a]">
              GET IN TOUCH
            </h2>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 select-none tracking-widest hidden md:block">
            MDS // CNCT:07C
          </span>
        </div>

        {/* Split Section: Details + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Column 1: Studio Details & Custom CAD Visual Map Plot (5 cols) */}
          <div className="lg:col-span-5 space-y-10 flex flex-col justify-between">
            <div className="space-y-8">
              <p className="font-sans font-light text-zinc-650 text-sm sm:text-base leading-relaxed">
                Have an upcoming custom residential villa or commercial workspace project? Contact our structural planning division today to schedule your complimentary initial design consultation.
              </p>

              {/* Direct Details */}
              <div className="space-y-6">
                <a
                  href={getGoogleMapsSearchUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group border-b border-zinc-100 pb-4 block"
                >
                  <div className="p-3 bg-[#f5f5f5] text-[#1a1a1a] rounded-none group-hover:bg-[#1a1a1a] group-hover:text-white transition duration-300">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase block">STUDIO ADDRESS</span>
                    <span className="font-sans text-xs font-semibold text-zinc-700 group-hover:text-black transition duration-300 block mt-0.5">
                      {data.address}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${data.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center space-x-4 group border-b border-zinc-100 pb-4 block"
                >
                  <div className="p-3 bg-[#f5f5f5] text-[#1a1a1a] rounded-none group-hover:bg-[#1a1a1a] group-hover:text-white transition duration-300">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase block">TELEPHONE INQUIRIES</span>
                    <span className="font-sans text-xs font-semibold text-zinc-700 group-hover:text-black transition duration-300 block mt-0.5">
                      {data.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center space-x-4 group border-b border-zinc-100 pb-4 block"
                >
                  <div className="p-3 bg-[#f5f5f5] text-[#1a1a1a] rounded-none group-hover:bg-[#1a1a1a] group-hover:text-white transition duration-300">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase block">ELECTRONIC MAIL</span>
                    <span className="font-sans text-xs font-semibold text-zinc-700 group-hover:text-black transition duration-300 block mt-0.5">
                      {data.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center space-x-4 border-b border-zinc-100 pb-4">
                  <div className="p-3 bg-[#f5f5f5] text-[#1a1a1a] rounded-none">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-mono text-[8px] text-zinc-400 tracking-wider uppercase block">OFFICE HOURS</span>
                    <span className="font-sans text-xs font-semibold text-zinc-700 block mt-0.5">
                      {data.officeHours}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Custom high-contrast layout blueprint CAD map of San Francisco */}
            <div className="border border-zinc-200 p-2 bg-[#f5f5f5] rounded-none shadow-none relative group">
              <div className="absolute top-4 right-4 bg-[#1a1a1a] text-white font-mono text-[8px] tracking-widest px-2.5 py-1 z-10 select-none uppercase rounded-none">
                CAD STRUCT MAP
              </div>

              <div className="h-44 bg-zinc-950 border border-zinc-90 w-full relative flex items-center justify-center overflow-hidden rounded-none">
                {/* Simulated geographic coordinates circles */}
                <div className="absolute inset-0 grid-overlay-dark opacity-15 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none border border-dashed border-zinc-800 h-32 w-32 animate-pulse speed-[15s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none border border-zinc-800 h-24 w-24" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none border border-zinc-800 h-12 w-12" />

                {/* Plot intersection lines */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-805" />
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-zinc-805" />

                {/* Plot marker */}
                <div className="absolute top-[48%] left-[48%] z-10 flex flex-col items-center rounded-none">
                  <div className="h-4 w-4 rounded-none bg-white animate-ping absolute" />
                  <div className="h-4 w-4 rounded-none bg-white border-2 border-zinc-950 flex items-center justify-center relative shadow-none">
                    <div className="h-2 w-2 rounded-none bg-zinc-900" />
                  </div>
                  <span className="bg-[#1a1a1a] text-[8px] border border-zinc-800 font-mono tracking-wider font-bold text-white px-1.5 py-0.5 rounded-none shadow-none mt-1">
                    STUDIO 24
                  </span>
                </div>

                {/* Info Overlay */}
                <div className="absolute bottom-2 left-3 font-mono text-[8px] text-zinc-500 tracking-wider">
                  LAT: 37° 46' 30" // LNG: -122° 25' 10"
                </div>
              </div>

              {/* Real Google Maps Click trigger */}
              <a
                href={getGoogleMapsSearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1a1a1a] group-hover:bg-black text-white hover:text-white block px-4 py-3 text-center text-[10px] uppercase font-mono tracking-[0.2em] font-medium mt-2 rounded-none shadow-none"
              >
                OPEN REAL GOOGLE DIRECTIONS MAPS
              </a>
            </div>
          </div>

          {/* Column 2: Inquiries Form sheet (7 cols) */}
          <div className="lg:col-span-7 bg-[#f5f5f5] p-8 md:p-10 border border-zinc-200 flex flex-col justify-between rounded-none shadow-none text-[#1a1a1a]">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-5 h-5 text-[#1a1a1a]" />
                <h3 className="font-display font-medium text-lg text-[#1a1a1a] uppercase">
                  TRANSMIT DIGITAL INQUIRY
                </h3>
              </div>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 text-center rounded-none shadow-none space-y-4 my-8">
                  <div className="p-3 bg-emerald-100 text-emerald-850 w-max rounded-none mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-medium text-lg text-emerald-900 uppercase">
                    TRANSMISSION SUCCESSFUL
                  </h4>
                  <p className="font-sans text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                    Thank you. Your inquiry has been securely stored in the studio's system data queue. An associate from our architectural division will connect with you via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Jonathan Carter"
                        className="w-full bg-white border border-zinc-200 focus:border-[#1a1a1a] outline-none px-4 py-3.5 text-xs text-zinc-900 transition rounded-none shadow-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. j.carter@estate.com"
                        className="w-full bg-white border border-zinc-200 focus:border-[#1a1a1a] outline-none px-4 py-3.5 text-xs text-zinc-900 transition rounded-none shadow-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">
                      Subject Matter
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="e.g. Custom Villa Construction in SF"
                      className="w-full bg-white border border-zinc-200 focus:border-[#1a1a1a] outline-none px-4 py-3.5 text-xs text-zinc-900 transition rounded-none shadow-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block font-bold">
                      Message Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Provide dimensions, timelines, site details, and specialized desires..."
                      className="w-full bg-white border border-zinc-200 focus:border-[#1a1a1a] outline-none p-4 text-xs text-zinc-900 transition resize-none rounded-none shadow-none"
                    />
                  </div>

                  {/* Send Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1a1a1a] hover:bg-black disabled:bg-zinc-600 text-white font-medium text-xs tracking-[0.2em] uppercase py-4 transition duration-300 font-sans flex items-center justify-center space-x-2 rounded-none shadow-none border border-[#1a1a1a]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-none animate-spin" />
                          <span>TRANSMITTING INBOX DATA...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4.5 h-4.5" />
                          <span>TRANSMIT MESSAGE NOW</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Instant WhatsApp chat trigger in monochromatic slate style */}
            <div className="mt-8 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="font-mono text-[9px] text-zinc-550 block uppercase font-bold">OR CHAT IMMEDIATELY</span>
                <span className="font-sans text-xs text-zinc-650 block mt-0.5">Reach our construction engineering leads directly on WhatsApp</span>
              </div>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 bg-[#1a1a1a] hover:bg-zinc-900 duration-300 text-white font-semibold text-xs tracking-wider uppercase px-5 py-3 border border-[#1a1a1a] transition rounded-none shadow-none"
              >
                <span>CHat on WhatsApp</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
