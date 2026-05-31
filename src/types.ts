export interface HeroData {
  headline: string;
  subheadline: string;
  ctaTextPrimary: string;
  ctaTextSecondary: string;
  backgroundImageUrl: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  philosophy: string;
  stats: {
    id: string;
    value: string;
    label: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  category: "Residential" | "Commercial" | "Interior" | "Construction";
  location: string;
  description: string;
  imageUrl: string;
  year: string;
  area?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  name: string;
  description: string;
  timelineEstimate: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  projectType: string;
  quote: string;
  rating: number;
}

export interface ContactData {
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  officeHours: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface WebsiteContent {
  hero: HeroData;
  about: AboutData;
  services: ServiceItem[];
  projects: ProjectItem[];
  process: ProcessStep[];
  whyChooseUs: WhyChooseUsItem[];
  testimonials: TestimonialItem[];
  contact: ContactData;
}
