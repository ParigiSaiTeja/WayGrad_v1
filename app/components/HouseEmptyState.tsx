'use client';

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Coming Soon",
  subtitle = "Working on it!",
  showReset
}) => {
  const router = useRouter();

  const handleResetFilters = () => {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('?')[0]; // Remove query parameters
    router.push(baseUrl); // Redirect to the URL without query parameters
  };

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
        <Heading
        center
        title={title}
        subtitle={subtitle}
      />
     
     
    </div>
   );
}

export default EmptyState;
