'use client';

import { SafeUser } from "@/app/types";
import Image from "next/image";
import React, { useState } from "react";

interface SubleaseListingHeadProps {
  gender: string;
  imageSrc: string[]; // Array of image URLs
 
  currentUser?: SafeUser | null;
}

const SubleaseListingHead: React.FC<SubleaseListingHeadProps> = ({
  gender,
  imageSrc,
 
  currentUser
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1));
  };

  // Get the current image URL or use a placeholder if the array is empty
  // app/components/sublets/SubleaseListingHead.tsx

// Assume imageSrc could potentially be undefined or not an array
const currentImage = imageSrc && Array.isArray(imageSrc) && imageSrc.length > 0
? imageSrc[currentIndex]
: '/placeholder-image.jpg';


  return (
    <>
    
      <div className="relative w-full h-[60vh] overflow-hidden rounded-xl">
        <Image
          src={currentImage}
          fill
          className="object-contain w-full h-full" // Use object-contain to display image as is
          alt="Image"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
        >
          &gt;
        </button>
        
      </div>
    </>
  );
};

export default SubleaseListingHead;
