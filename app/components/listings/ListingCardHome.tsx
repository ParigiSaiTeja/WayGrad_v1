import Image from "next/image";
import React from 'react';

interface ListingCardProps {
  imageSrc: string;
  redirectTo: string;
  width?: string; // Optional
  height?: string; // Optional
}

const ListingCard: React.FC<ListingCardProps> = ({
  imageSrc,
  redirectTo,
  width = 'w-full',
  height = 'h-[calc(100vh-50px)]', // Adjust this if needed for full viewport height
}) => {
  return (
    <a 
      href={redirectTo} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`relative ${width} ${height} cursor-pointer shadow-xl rounded-lg bg-white overflow-hidden`} // Added overflow-hidden to ensure rounded corners are visible
    >
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt="Listing Image"
          layout="fill"
          className="object-cover" // Object-cover ensures the image covers the container while keeping its aspect ratio
        />
      </div>
    </a>
  );
};

export default ListingCard;
