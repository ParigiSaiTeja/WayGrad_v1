'use client';

import { SafeSubleaseListing, SafeUser } from "@/app/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import Button from "../Button";
import HeartButton from "../HeartButton";

interface SubleaseCardProps {
  data: SafeSubleaseListing;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const SubleaseCard: React.FC<SubleaseCardProps> = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    }, [disabled, onAction, actionId]);

  const handleSeeMoreInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    router.push(`/subleaseListings/${data.id}`); // Navigate to the sublease listing details page
  };

  const currentImage = data.imageSrc.length > 0 ? data.imageSrc[currentIndex] : '/default-image.jpg';

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === data.imageSrc.length - 1 ? 0 : prevIndex + 1));
  };

  let location: { label: string } | null = null;
  if (typeof data.location === 'string') {
    try {
      location = JSON.parse(data.location);
    } catch (e) {
      console.error('Failed to parse location', e);
    }
  }

  const formattedStartingFrom = new Date(data.startingFrom).toLocaleDateString();
  const formattedTillDate = new Date(data.tillDate).toLocaleDateString();

  return (
    <div 
      onClick={() => router.push(`/subleaseListings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={currentImage}
            alt="Sublease"
          />
          {data.imageSrc.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
              >
                &lt;
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-lg"
              >
                &gt;
              </button>
            </>
          )}
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-light text-neutral-500">
          Gender: {data.gender}
        </div>
        <div className="font-light text-neutral-500">
          Room Type: {data.roomType}
        </div>
        <div className="font-light text-neutral-500">
          Utilities Included: {data.utilities}
        </div>
        <div className="font-light text-neutral-500">
          Sublet Type: {data.leaseType}
        </div>
        <div className="font-light text-neutral-500">
          Location: {data.location || 'Unknown'}
        </div>
        <div className="font-light text-neutral-500">
          University: {currentUser?.university || 'Unknown'}
        </div>
        <div className="font-light text-neutral-500">
          Starting From: {formattedStartingFrom}
        </div>
        <div className="font-light text-neutral-500">
          Till Date: {formattedTillDate}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            $ {data.price}
          </div>
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel} 
            onClick={handleCancel}
          />
        )}
        <Button
          label="See More Info"
          onClick={handleSeeMoreInfo}
        />
      </div>
    </div>
  );
}

export default SubleaseCard;
