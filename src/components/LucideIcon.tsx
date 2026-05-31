import React from "react";
import * as Icons from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "w-6 h-6", size }: LucideIconProps) {
  // Safe mapping of name to Lucide components
  // @ts-ignore
  const IconComponent = Icons[name];

  if (!IconComponent) {
    // Return a default icon (e.g., Compass or Circle) if the specific one is not found
    return <Icons.HelpCircle className={className} size={size} />;
  }

  return <IconComponent className={className} size={size} />;
}
