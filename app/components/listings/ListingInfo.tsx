'use client';

import useCitiesAndStates from "@/app/hooks/useCitiesAndStates";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { IconType } from "react-icons";
import Button from "../Button";
import ListingCategory from "./ListingCategory";
interface ListingInfoProps {
  user: SafeUser;
  data: SafeListing;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: {
    icon: IconType;
    label: string;
    description: string;
  } | undefined;
  locationValue: string;
  amazonLink?: string;
  price: number;
  isBid: boolean;
  currentUser?: SafeUser | null;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  data,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
  amazonLink,
  price,
  isBid,
  currentUser,
}) => {
  const { getByValue } = useCitiesAndStates();
  const coordinates = getByValue(locationValue)?.latlng;


const loginModal=useLoginModal();
  const [bidAmount, setBidAmount] = useState('');
  const [userBidAmount, setUserBidAmount] = useState<number | null>(null);
  const [mostRecentBid, setMostRecentBid] = useState<number>(0);
  const [isBidding, setIsBidding] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMostRecentBid = async () => {
      if (!locationValue) return;
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
      if (!locationValue || !currentUser?.id) return;
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
  }, [locationValue, currentUser, data.id]);
  

  const handlePlaceBid = () => {
    console.log('Current User:', currentUser); // Debug log

    if (!currentUser) {
      toast.error('You need to Login First.');
      return;
    }
  
    if (user?.id === currentUser.id) {
      toast.error('You cannot bid on your own item.');
      return;
    }
  
    setIsBidding(true);
    setIsBidding(true);
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBidAmount(e.target.value);
  };

  const handleSubmitBid = async () => {
    if (!bidAmount  || !currentUser?.id) {
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
          listingId:data.id,
          userId: currentUser.id,
           username:currentUser.name, 
           email:currentUser.email, 
           phone:currentUser.phonenumber, 
           university:currentUser.university,
             category,
        }),
      });

      const placeBidResult = await placeBidResponse.json();
      if (placeBidResponse.ok) {
        setMostRecentBid(parseFloat(bidAmount));
        setUserBidAmount(parseFloat(bidAmount));
        toast.success('Bid placed successfully!');
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

  const currentUrl = typeof window !== "undefined" ? `${window.location.href}?listingId=${data.id}` : '';

  const handleContactSeller = () => {

    if (!currentUser) {
      toast.error('You need to Login First.');
      loginModal.onOpen();
      return;
    }

    const phoneNumber = user?.phonenumber;
    const encodedMessage = encodeURIComponent(
      `Hello ${user?.name}, I'm interested in your ${category} ($${price}), which was listed at: ${currentUrl}`
    );
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className="col-span-4 flex flex-col gap-8 md:pl-96  md:items-start md:text-left">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col  gap-4">
          <div className="text-xl font-semibold">
            Posted by {user?.name}
          </div>
        </div>

        <div className="text-lg font-light text-neutral-500">
          {user.university}
        </div>
      </div>

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <div className="text-lg font-semibold text-neutral-900">
        Price: ${price}
      </div>

      <div className="text-lg font-semibold text-neutral-900">
        Location: {locationValue}
      </div>

      {amazonLink && (
  <div className="text-lg font-semibold text-neutral-900">
    <a
      href={amazonLink.startsWith('http://') || amazonLink.startsWith('https://') 
        ? amazonLink 
        : `http://${amazonLink}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-black-500 hover:underline"
    >
      View Original on Amazon
    </a>
  </div>
)}
      <div className="flex gap-4 flex-col items-center md:items-start">
        {isBid ? (
          <>
            <Button
              label="Place Bid"
              onClick={handlePlaceBid}
              small
            />
            {isBidding && userBidAmount === null && (
              <div className="flex flex-col gap-2">
                <input
                  type="number"
                  value={bidAmount}
                  onChange={handleBidChange}
                  placeholder="Enter your bid amount"
                  className="p-2 border border-gray-300 rounded"
                />
                <Button
                  disabled={!bidAmount || loading}
                  label={loading ? "Submitting..." : "Submit Bid"}
                  onClick={handleSubmitBid}
                  small
                />
              </div>
            )}
            {userBidAmount !== null && (
              <div className="text-center text-gray-500">
                You have already placed a bid of ${userBidAmount}.
              </div>
            )}
            {mostRecentBid > 0 && (
              <div className="text-center text-gray-500">
                Most Recent Bid: ${mostRecentBid}
              </div>
            )}
          </>
        ) : (
          <Button
            label="Contact Seller"
            onClick={handleContactSeller}
            small
            className="mb-4" 
          />
        )}
      </div>
    </div>
  );
};

export default ListingInfo;
