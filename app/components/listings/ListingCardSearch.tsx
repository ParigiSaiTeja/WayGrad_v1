'use client';

import { categoryLinks } from "@/app/categoryLinks"; // Import category links
import useFavorite from "@/app/hooks/useFavorite";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from 'react';
import toast from "react-hot-toast";
import Button from "../Button";

interface ListingCardProps {
  listingId: string; // Listing ID to fetch the data
  currentUser?: SafeUser | null; // Optional current user data
  data: SafeListing;
  category?: string; // New prop for category
}

const ListingCard: React.FC<ListingCardProps> = ({ listingId, currentUser, data, category }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const loginModal = useLoginModal();
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      toast.error('You need to Login First.');
      return loginModal.onOpen();
    }

    router.push(`/listings/${listingId}`);
  }, [loginModal, router, currentUser, listingId]);

  const price = data?.price || 0;
  const currentImage = data?.imageSrc?.length ? data.imageSrc[currentIndex] : '/images/default-image.jpg';

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? (data?.imageSrc.length || 1) - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === (data?.imageSrc.length || 1) - 1 ? 0 : prevIndex + 1));
  };

  const amazonLink = category && categoryLinks[category] ? categoryLinks[category] : '';

  const handleRedirectToAmazon = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (amazonLink) {
      window.open(amazonLink, '_blank'); // Open the link in a new tab
    } else {
      console.error('Amazon link is not available.');
    }
  };

  const handleCardClick = () => {
    router.push(`/listings/${listingId}`);
  };

  return (
    <div 
      className="flex flex-col h-[400px] w-[300px] max-w-[90vw] cursor-pointer shadow-md rounded-lg bg-white mx-auto overflow-hidden" // Removed padding and adjusted height and width
    >
      <div 
        className="relative flex-1" // Ensure the image takes up the available space
      >
        <Image
          fill
          className="object-cover"
          src={currentImage || "/images/default-image.jpg"}
          alt="Listing Image"
        />
        {data?.imageSrc?.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="
                absolute 
                top-1/2 
                left-2 
                transform 
                -translate-y-1/2 
                bg-white 
                text-black 
                p-1 
                rounded-full 
                shadow-md
              "
            >
              &lt;
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="
                absolute 
                top-1/2 
                right-2 
                transform 
                -translate-y-1/2 
                bg-black 
                text-white 
                p-1 
                rounded-full 
                shadow-md
              "
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col justify-between pl-2 "> {/* Added flex-col and justify-between */}
        <div className="font-light text-neutral-500 text-sm ">
          {data?.category}
        </div>
        <Button
          small
          label="View on Amazon"
          onClick={handleRedirectToAmazon}
          className="mt-2" // Added margin-top to separate from the category text
        />
      </div>
    </div>
  );
};

export default ListingCard;
