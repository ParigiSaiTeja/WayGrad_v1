'use client';

import { SafeUser } from "@/app/types";
import React from 'react';
import Button from '../Button';

interface SubleaseListingInfoProps {
  user: SafeUser;
  gender?: string;
  roomType?: string;
  leaseType?: string;
  imageSrc?: string[];
  price?: number;
  utilities?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
}

const SubleaseListingInfo: React.FC<SubleaseListingInfoProps> = ({
  user,
  gender,
  roomType,
  leaseType,
  imageSrc,
  price,
  utilities,
  guestCount,
  roomCount,
  bathroomCount,
}) => {
  const currentUrl = typeof window !== "undefined" ? window.location.href : '';

  const handleContactOwner = () => {
    const phoneNumber = user.phonenumber;
    const encodedMessage = encodeURIComponent(
      `Hello ${user?.name}, I'm interested in your sublease listing ($${price}), which was listed at: ${currentUrl}`
    );
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, '_blank'); 
  };

  return (
    <div className="flex flex-col items-center gap-8 px-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 w-full text-center">
        <div className="text-lg md:text-xl font-semibold">
          Posted by {user?.name}
        </div>
        <div className="text-md md:text-lg font-semibold">
          {user?.university}
        </div>
        <div className="flex justify-center">
          <Button
            label="Contact Owner"
            onClick={handleContactOwner}
            small
          />
        </div>
      </div>

      <hr className="w-full" />

      <div className="flex flex-col gap-4 w-full text-center">
        <div className="flex flex-col items-center gap-4 font-light text-neutral-500">
          {/* Additional information or descriptions can go here */}
        </div>
      </div>
    </div>
  );
}

export default SubleaseListingInfo;
