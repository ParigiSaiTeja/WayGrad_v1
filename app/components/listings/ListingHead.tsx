'use client';

import { SafeUser } from "@/app/types";
import Image from "next/image";
import React, { useState } from 'react';
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string[]; // Array of image URLs
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  id,
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
  const currentImage = imageSrc[currentIndex] || '/images/default-image.jpg';

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
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
