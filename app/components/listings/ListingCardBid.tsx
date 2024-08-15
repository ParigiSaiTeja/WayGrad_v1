'use client';

import { format } from 'date-fns';
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import useCitiesAndStates from '@/app/hooks/useCitiesAndStates';
import useFavorite from "@/app/hooks/useFavorite";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;

  imageSize: "small" | "medium" | "large";
}

const ListingCard: React.FC<ListingCardProps> = ({
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
  const [isBidding, setIsBidding] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [userBidAmount, setUserBidAmount] = useState<number | null>(null);
  const [mostRecentBid, setMostRecentBid] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { getByValue } = useCitiesAndStates();
  const loginModal = useLoginModal();
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId: data.id,
    currentUser,
  });

  const location = getByValue(data?.locationValue);

  useEffect(() => {
    const fetchMostRecentBid = async () => {
      if (!data?.id) return;
      try {
        const response = await fetch(`/api/most-recent-bid?listingId=${data.id}`);
        const result = await response.json();
        if (response.ok) {
          setMostRecentBid(result.bidAmount || 0);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Failed to fetch most recent bid:', error);
      }
    };

    const fetchUserBidAmount = async () => {
      if (!data?.id || !currentUser?.id) return;
      try {
        const response = await fetch(`/api/user-bid-amount?listingId=${data.id}&userId=${currentUser.id}`);
        const result = await response.json();
        if (response.ok) {
          setUserBidAmount(result.bidAmount || null);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error('Failed to fetch user bid amount:', error);
      }
    };

    fetchMostRecentBid();
    fetchUserBidAmount();
  }, [data?.id, currentUser]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push(`/listings/${data?.id}`);
  }, [loginModal, router, currentUser, data?.id]);

  const price = useMemo(() => data?.price || 0, [data?.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const currentImage = data?.imageSrc.length > 0 ? data.imageSrc[currentIndex] : '/images/default-image.jpg';

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data?.imageSrc.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data?.imageSrc.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePlaceBid = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    if (data?.userId === currentUser.id) {
      toast.error('You cannot bid on your own item.');
      return;
    }

    setIsBidding(true);
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };

  const handleSubmitBid = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!bidAmount || !data?.id || !currentUser?.id) {
      toast.error('All fields are required.');
      return;
    }

   

    setLoading(true);

    try {
      const placeBidResponse = await fetch('/api/bidplaced', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bidAmount: parseFloat(bidAmount),
          listingId: data.id,
          username: currentUser.name || '',
          email: currentUser.email || '',
          phone: currentUser.phonenumber || '',
          name: currentUser.name ||'',
          category: data?.category ||'',
          university: currentUser.university || '',
          userId: currentUser.id || '',
          dataId: data?.id||'',
        }),
      });

      const placeBidResult = await placeBidResponse.json();
      if (placeBidResponse.ok) {
        setMostRecentBid(parseFloat(bidAmount));
        setUserBidAmount(parseFloat(bidAmount));
        toast.success('Bid placed successfully. The seller will contact you if your offer is accepted.', { duration: 5000 });

        // Add to favorites after a successful bid
        if (!hasFavorited) {
          toggleFavorite(e as unknown as React.MouseEvent<HTMLDivElement>); // Cast event to appropriate type
        }
      } else {
        toast.error(placeBidResult.error || 'Failed to place bid.');
      }
    } catch (error) {
      console.error('Failed to place bid:', error);
      toast.error('Failed to place bid.');
    }

    setIsBidding(false);
    setBidAmount('');
    setLoading(false);
  };

  function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    if (onAction && actionId) {
      onAction(actionId);
    }
  }
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
  


  const handleCardClick = () => {
    router.push(`/listings/${data?.id}`);
  };

  return (
    <div 
      className="flex flex-col gap-2   shadow-lg w-full cursor-pointer" 
      // Redirect to listing detail on card click
    >
      <div className="
        aspect-square 
        w-full 
        relative 
        overflow-hidden 
        rounded-xl
      ">
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
        <div className="
          absolute
          top-3
          right-3
        ">
          {/* Favorite button can be placed here if needed */}
        </div>
      </div>
    
      <div className="font-light text-neutral-500 pl-2">
        {data?.category}
      </div>
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
      <div className="font-light text-neutral-500 pl-2">
        {data?.locationValue}
      </div>
      <div className="font-light text-neutral-500 pl-2">
        {data?.university}
      </div>
      
      <div className="flex justify-between items-center pl-2">
        <div className="font-semibold text-small text-black">
          Listed Price: ${price}
        </div>
        {mostRecentBid > 0 && (
          <div className="font-semibold text-small text-black-500 ">
            Most Recent Bid: ${mostRecentBid}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
        <Button
          disabled={disabled || loading}
          small
          label="Place Bid"
          onClick={handlePlaceBid}
        />
        {isBidding && userBidAmount === null && (
          <div className="flex flex-row justify-between items-center gap-1">
            <input
              type="number"
              value={bidAmount}
              onChange={handleBidChange}
              placeholder="Enter your bid amount"
              className="p-2 border border-gray-300 rounded"
            />
            <Button
              disabled={!bidAmount || loading} // Disable while loading or if no bid amount
              small
              label={loading ? "Submitting..." : "Submit Bid"} // Show loading text if loading
              onClick={handleSubmitBid}
              className="mt-2"
            />
          </div>
        )}
        {userBidAmount !== null && (
          <div className="text-center text-gray-500">
            Your Current Bid ${userBidAmount}.
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingCard;
