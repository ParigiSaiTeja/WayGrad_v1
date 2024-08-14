'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from 'react';

import useCitiesAndStates from '@/app/hooks/useCitiesAndStates';
import useFavorite from "@/app/hooks/useFavorite";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import toast from "react-hot-toast";
import Button from "../Button";

interface ListingCardProps {
  user?: SafeUser; // Ensure this is provided
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null; // Optional
  imageSize?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
  user,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  imageSize = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { getByValue } = useCitiesAndStates();
  const loginModal = useLoginModal();
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId: data.id,
    currentUser
  });

  const location = getByValue(data?.locationValue);

  const onRent = useCallback(() => {
    if (!currentUser) {
      toast.error('You need to Login First.');
      return loginModal.onOpen();
    }

    router.push(`/listings/${data?.id}`);
  }, [loginModal, router, currentUser, data?.id]);

  const price = useMemo(() => {
    return data?.price || 0;
  }, [data?.price]);

  const currentImage = data?.imageSrc.length > 0 ? data.imageSrc[currentIndex] : '/images/default-image.jpg';

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data?.imageSrc.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data?.imageSrc.length - 1 ? 0 : prevIndex + 1));
  };

  const handleContactSeller = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Prevent parent click handlers

    if (!currentUser) {
      toast.error('You need to Login First.');
      loginModal.onOpen(); // Open login modal if the user is not logged in
      return;
    }

    if (data) { // Ensure data is available
      const newId = data.id;
      const phoneNumber = data.phonenumber; // Ensure the user object contains 'phonenumber'

      // Modify the URL to include 'everylisting' followed by the listing ID
      const newUrl = `${window.location.origin}/listings/${newId}`;

      // Encode the message with the new URL
      const encodedMessage = encodeURIComponent(
        `Hello ${user?.name}, I'm interested in your ${data.category} ($${data.price}), which was listed at: ${newUrl}`
      );

      const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      console.log('Opening URL:', url); // Debugging line
      window.location.href = url;
    } else {
      console.error('Listing data is not available.');
    }
  };

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    if (onAction && actionId) {
      onAction(actionId);
    }
  }

  const handleCardClick = () => {
    router.push(`/listings/${data?.id}`);
  };

  const handleAmazonLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.stopPropagation(); // Prevents the event from propagating further up the DOM tree
    e.preventDefault(); // Prevents the default action associated with the event
  
    // Ensure the URL starts with http:// or https://
    const fullUrl = data?.amazonLink?.startsWith('http://') || data?.amazonLink?.startsWith('https://')
      ? data.amazonLink
      : `http://${data.amazonLink}`; // Prepend http:// if not present
  
    if (fullUrl) {
      window.open(fullUrl, '_blank'); // Directly opens the URL in a new tab
    }
  };
  

  return (
    <div 
      className="flex flex-col h-full gap-2 w-full cursor-pointer shadow-lg rounded-lg bg-white" // Added shadow and rounded corners, and set height to full
      onClick={handleCardClick} // Added click handler for card click
    >
      <div 
        className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-t-lg // Adjusted rounded corners to match card's rounded corners
        "
      >
        <Image
          fill
          className="object-cover"
          src={currentImage || "/images/default-image.jpg"}
          alt="Listing Image"
        />
        {data?.imageSrc.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="
                absolute 
                top-1/2 
                left-4 
                transform 
                -translate-y-1/2 
                bg-white 
                text-black 
                p-2 
                rounded-full 
                shadow-lg
              "
            >
              &lt;
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="
                absolute 
                top-1/2 
                right-4 
                transform 
                -translate-y-1/2 
                bg-black 
                text-white 
                p-2 
                rounded-full 
                shadow-lg
              "
            >
              &gt;
            </button>
          </>
        )}
        <div className="absolute top-3 right-3">
          {/* Add favorite button or other elements here if needed */}
        </div>
      </div>
    
      <div className="font-light text-neutral-500 pl-2"> {/* Added padding-left */}
        {data?.category}
      </div>
      {/* Conditionally render Amazon link */}
      {data?.amazonLink && (
        <div className="mt-2 pl-2"> {/* Added padding-left */}
          <a 
            href={data.amazonLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black-500 underline"
            onClick={handleAmazonLinkClick}
          >
            View Original on Amazon
          </a>
        </div>
      )}
      <div className="font-light text-neutral-500 pl-2"> {/* Added padding-left */}
        {data?.locationValue} 
      </div>
      <div className="font-light text-neutral-500 pl-2"> {/* Added padding-left */}
        {data?.university}
      </div>
      
      <div className="flex justify-between items-center pl-2"> {/* Added padding-left */}
        <div className="font-semibold text-lg text-black">
          ${price}
        </div>
      </div>
      
      <div className="flex flex-col gap-2 pl-2 mt-auto"> {/* Added padding-left and margin-top-auto to push it to the bottom */}
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        <Button
          small
          label="Contact Seller"
          onClick={handleContactSeller} // Pass event object to handleContactSeller
        />
      </div>
    </div>
  );
};

export default ListingCard;
