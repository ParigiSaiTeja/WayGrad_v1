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
    <div className="flex justify-center">
      <button
        className="
          text-white
         mb-2
          py-3 
          px-6
          rounded-full 
          transition 
          cursor-pointer 
          bg-black
          hover:bg-neutral-200
        "
        onClick={handleBiddingClick}
      >
        Auction Page
      </button>
    </div>
  );
}

export default UserMenu;
