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
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          transition 
          cursor-pointer 
          bg-neutral-100
          hover:bg-neutral-200
        "
        onClick={handleBiddingClick}
      >
        Bid Now
      </button>
    </div>
  );
}

export default UserMenu;
