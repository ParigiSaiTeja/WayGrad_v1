'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from 'react';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

interface ListingCardMediumProps {
  user: SafeUser;
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  imageSize?: string;
}

const ListingCardMedium: React.FC<ListingCardMediumProps> = ({
  user,
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
  imageSize='',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const loginModal = useLoginModal();
 


  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push(`/listings/${data?.id}`);
  }, [loginModal, router, currentUser, data?.id]);

  const price = useMemo(() => {
    return data?.price || 0;
  }, [data?.price]);

  const currentImage = data?.imageSrc.length > 0 ? data.imageSrc[currentIndex] : '/images/default-image.jpg';


  

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    if (onAction && actionId) {
      onAction(actionId);
    }
  }

  const handleCardClick = () => {
    router.push(`/listings/${data?.id}`);
  };

  

  return (
    <div 
      className="flex flex-col gap-2 w-full cursor-pointer" 
      onClick={handleCardClick} // Redirect to listing detail on card click
    >
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
          className="object-cover"
          src={"/images/medium1.png"}
          alt="Listing Image"
        />
       
     
      </div>
    
      
      
    
   
      
     
      
    </div>
  );
};

export default ListingCardMedium;
