import { WebsiteContent } from "./types";

export const initialContent: WebsiteContent = {
  hero: {
    headline: "Designing Spaces. Building Dreams.",
    subheadline: "Architecture , Interior & construction solutions by MARK d STUDIO",
    ctaTextPrimary: "View Projects",
    ctaTextSecondary: "Get Consultation",
    backgroundImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85&auto=compress"
  },
  about: {
    title: "ABOUT MARK D STUDIO",
    subtitle: "WE SHAPE SPACE WITH PRECISION AND IMAGINATION",
    description: "MARK D STUDIO is a premier international architectural design, luxury interior, and turnkey construction studio. We believe architecture is the art of organizing three-dimensional space to solve structural problems while elevating human experience. From bespoke residential homes to sprawling commercial developments, we synthesize creative vision, materials science, and meticulous engineering to deliver projects that Stand as physical testaments to craftsmanship and functional elegance.",
    mission: "To deliver custom architectural and interior spaces through collaborative design, rigorous transparency, and a turnkey construction workflow that exceeds client expectations from inception to handover.",
    vision: "To set global standards for modern, minimal engineering and sustainable building practices, creating spaces that stand the test of time both structurally and aesthetically.",
    philosophy: "We seek a pure relationship between structural form, raw materials, light, and shadow. By maintaining a clean grey-scale aesthetic, we let the structural beauty of concrete, steel, glass, and wood emerge without visual noise.",
    stats: [
      { id: "stat-1", value: "12+", label: "Years Experience" },
      { id: "stat-2", value: "140+", label: "Completed Projects" },
      { id: "stat-3", value: "48", label: "Design Awards" },
      { id: "stat-4", value: "100%", label: "Turnkey Satisfaction" }
    ]
  },
  services: [
    {
      id: "srv-1",
      title: "Architectural Design",
      description: "Concept development, space programming, site planning, and complete schematic designs with structural engineering integration.",
      iconName: "Compass",
      features: ["Schematic Layouts", "Site Planning", "Massing Studies", "Structural Drafting"]
    },
    {
      id: "srv-2",
      title: "Interior Design",
      description: "Elite interior architecture, custom fittings, bespoke lighting, and sophisticated material selectors optimized for premium spaces.",
      iconName: "Layers",
      features: ["Space Planning", "Custom Joinery", "Material Palettes", "Lighting Layouts"]
    },
    {
      id: "srv-3",
      title: "Construction Management",
      description: "End-to-end site supervision, vendor coordination, cost optimization, quality control audits, and progressive safety reports.",
      iconName: "Hammer",
      features: ["Quality Audits", "Cost Engineering", "Live Scheduling", "Contract Administration"]
    },
    {
      id: "srv-4",
      title: "Residential Projects",
      description: "Crafting customized modern luxury villas, duplexes, multi-family apartments, and eco-friendly urban residences reflecting your lifestyle.",
      iconName: "Home",
      features: ["Duplexes & Villas", "Urban Apartments", "Custom Facades", "Green Certifications"]
    },
    {
      id: "srv-5",
      title: "Commercial Projects",
      description: "Designing high-efficiency corporate headquarters, hospitality lounges, retail outlets, and multi-tenant workspace hubs.",
      iconName: "Building",
      features: ["Corporate Offices", "Hospitality Spaces", "Retail Showrooms", "Integrated HVAC Planning"]
    },
    {
      id: "srv-6",
      title: "Renovation & Remodeling",
      description: "Structural retrofitting, space optimization, historical preservation, and contemporary updates of legacy residences and offices.",
      iconName: "RotateCcw",
      features: ["Structural Retrofits", "Facade Restyling", "MEP Modernization", "Space Expansion"]
    },
    {
      id: "srv-7",
      title: "Turnkey Solutions",
      description: "Comprehensive stress-free execution—handling initial design, regulatory approvals, procuring materials, and actual civil engineering works.",
      iconName: "CheckSquare",
      features: ["Regulatory Approvals", "Material Procurement", "Civil Execution", "Single-Point Accountability"]
    },
    {
      id: "srv-8",
      title: "3D Visualization & Planning",
      description: "Ultra-photorealistic CG render plans, immersive 3D virtual walkthroughs, and precise physical scale blueprints.",
      iconName: "Eye",
      features: ["Photorealistic CGIs", "Virtual Walkthroughs", "BIM Integration", "Drone Topography Mapping"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "The Monolith Residence",
      category: "Residential",
      location: "Beverly Hills, CA",
      description: "A striking cast-in-place raw concrete family villa characterized by expansive column-free spans, seamless glass sliding walls, and a recessed courtyard which channels morning sunlight.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      year: "2024",
      area: "6,400 sq. ft."
    },
    {
      id: "proj-2",
      name: "Atrium Corporate HQ",
      category: "Commercial",
      location: "Frankfurt, Germany",
      description: "A ten-story corporate office hub organized around a massive central light well. Featuring sustainable timber rafters, low-emissivity glass skin, and an energy-conserving thermal mass system.",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      year: "2025",
      area: "52,000 sq. ft."
    },
    {
      id: "proj-3",
      name: "Noir Minimalist Penthouse",
      category: "Interior",
      location: "Manhattan, NY",
      description: "Full interior spatial redesign using a rich monochromatic grey and black color palette, custom slate countertops, integrated flush-to-ceiling LED profiles, and hidden storage closets.",
      imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      year: "2023",
      area: "3,100 sq. ft."
    },
    {
      id: "proj-4",
      name: "Apex Luxury Villa Complex",
      category: "Construction",
      location: "Miami, FL",
      description: "Full turnkey civil engineering and structural framework execution of four oceanfront luxury duplexes, completed under budget and ahead of timeline within 18 months.",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      year: "2024",
      area: "22,000 sq. ft."
    },
    {
      id: "proj-5",
      name: "The Grey Scale Pavillion",
      category: "Residential",
      location: "Tokyo, Japan",
      description: "A quiet, meditative residential retreat focused on structural honesty. Constructed with a combination of exposed concrete blocks, black structural steel, and charred cedar panels.",
      imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      year: "2024",
      area: "4,200 sq. ft."
    },
    {
      id: "proj-6",
      name: "Prism Creative Studios",
      category: "Commercial",
      location: "London, UK",
      description: "Renovation and revitalization of a Victorian-era industrial warehouse into a modern, raw industrial workspace for design professionals, using exposed brick, steel beams, and polished concrete floors.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      year: "2023",
      area: "14,500 sq. ft."
    },
    {
      id: "proj-7",
      name: "Concrete Zenith Office Lobby",
      category: "Interior",
      location: "Singapore",
      description: "An elegant, cavernous lobby fit-out featuring sound-absorbing acoustic felt slats, an immense custom cast-terrazzo reception desk, and a sculptural concrete cantilevered staircase.",
      imageUrl: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
      year: "2025",
      area: "5,800 sq. ft."
    },
    {
      id: "proj-8",
      name: "Metro Structural Retrofit",
      category: "Construction",
      location: "Chicago, IL",
      description: "Complex underlying structural engineering works to secure foundation columns and extend cantilever support beams on a commercial tower, enabling safe dual-story vertical expansion.",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
      year: "2025",
      area: "38,000 sq. ft."
    }
  ],
  process: [
    {
      id: "prc-1",
      stepNumber: "01",
      name: "Consultation & Discovery",
      description: "We host alignment meetings to detail your structural requirements, specific lifestyle or corporate needs, budget expectations, and site conditions.",
      timelineEstimate: "Week 01-02"
    },
    {
      id: "prc-2",
      stepNumber: "02",
      name: "Concept Design",
      description: "Our design team creates 2D schematic layouts, initial massing models, and raw materials boards to establish the visual character and functional flow of your building.",
      timelineEstimate: "Week 03-06"
    },
    {
      id: "prc-3",
      stepNumber: "03",
      name: "Planning & Approvals",
      description: "We compile meticulous architectural blueprints, structural engineering documents, and MEP schematics to obtain municipal permits and final construction approvals.",
      timelineEstimate: "Week 07-12"
    },
    {
      id: "prc-4",
      stepNumber: "04",
      name: "Precision Construction",
      description: "Our expert civil engineering and site management crew executes ground excavations, foundation concrete pours, structural columns framing, and luxury finishing works.",
      timelineEstimate: "Months 04-12"
    },
    {
      id: "prc-5",
      stepNumber: "05",
      name: "Project Handover",
      description: "Following rigid double-checked quality inspections and structural stress evaluations, we present the finished project keys along with all mechanical, civil, and warranties manuals.",
      timelineEstimate: "Completion"
    }
  ],
  whyChooseUs: [
    {
      id: "wcu-1",
      title: "Experienced Team",
      description: "Our core associates comprise highly educated architects, structural planners, and master craftsmen who operate with unmatched professional maturity.",
      iconName: "Users"
    },
    {
      id: "wcu-2",
      title: "Innovative Design",
      description: "We avoid templates, tailoring every single curve, cantilever, and horizontal junction specifically for your physical site and modern lifestyle needs.",
      iconName: "TrendingUp"
    },
    {
      id: "wcu-3",
      title: "Quality Construction",
      description: "We employ double-inspected high-strength cast-concrete mixes, load-bearing thick structural timber, and precise joint sealants for lifelong structural integrity.",
      iconName: "Award"
    },
    {
      id: "wcu-4",
      title: "On-Time Delivery",
      description: "Our digital material trackers and active progress Gantt diagrams ensure supply delays are mitigated early, letting us handover key handings on the exact target date.",
      iconName: "Clock"
    },
    {
      id: "wcu-5",
      title: "Client Satisfaction",
      description: "We host weekly on-site updates and deliver high-transparency ledger reports, facilitating complete peace of mind across our turnkey execution projects.",
      iconName: "Smile"
    }
  ],
  testimonials: [
    {
      id: "tst-1",
      clientName: "Jonathan Sterling",
      role: "Real Estate Developer",
      projectType: "The Monolith Residence Owner",
      quote: "Working with MARK D STUDIO was an absolute masterclass in precision. They completed my modern concrete home within scheduled timelines. The spatial layout is incredibly poetic, channeling morning light perfectly. They handle everything from foundations to bespoke lights.",
      rating: 5
    },
    {
      id: "tst-2",
      clientName: "Dr. Elena Rostova",
      role: "CEO, Atrium Corp",
      projectType: "Atrium Corporate HQ",
      quote: "The team did what other architectural firms deemed impossible: built a completely load-optimizing ten-story building with timber rafters and a stunning center skylight that cut our corporate energy bill by 35%. Exceptional structural and artistic leadership.",
      rating: 5
    },
    {
      id: "tst-3",
      clientName: "Marcus Vance",
      role: "Design Critic & Homeowner",
      projectType: "Minimalist Penthouse Renovation",
      quote: "My luxury penthouse is now a true work of art. The monochromatic grey theme they implemented looks stunningly sophisticated without feeling sterile. Their attention to detail on flush doorways and shadow gaps is extraordinary.",
      rating: 5
    }
  ],
  contact: {
    phone: "+1 (415) 555-8290",
    email: "contact@markdstudio.com",
    address: "Studio 24, Architectural Block, 45 Brutalist Circle, SF, CA 94103",
    whatsappNumber: "14155558290",
    officeHours: "Monday - Friday: 09:00 AM - 06:00 PM EST",
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    }
  }
};
