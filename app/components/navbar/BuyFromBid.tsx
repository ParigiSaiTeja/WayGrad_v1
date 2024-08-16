'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const handleBiddingClick = useCallback(() => {
    router.push('/everybidlisting');
  }, [router]);

  return (
    <div className="flex justify-center relative">
      <button
        className="
          text-white
          mb-2
          py-3 
          px-6
          rounded-full 
          transition 
          shadow-sm 
          cursor-pointer 
          bg-black
          hover:bg-neutral-200
          relative
        "
        onClick={handleBiddingClick}
      >
        View Auction Listings
        <span
          className="
            absolute 
            top-0 
            right-0 
            transform translate-x-1/2 -translate-y-1/2
            bg-red-600 
            text-white 
            text-xs 
            px-2 
            py-1 
            rounded-full
          "
        >
         Live Now!
        </span> 
      </button>
    </div>
  );
}

export default UserMenu;
