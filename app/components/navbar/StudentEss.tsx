'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  const handleSubletClick = useCallback(() => {
    router.push('/studentessentials');
  }, [router]);

  // Determine if the current path is /everysublet


  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          className={`
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            transition 
            cursor-pointer
         
          `}
          onClick={handleSubletClick}
        >
        Student Essentials
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
