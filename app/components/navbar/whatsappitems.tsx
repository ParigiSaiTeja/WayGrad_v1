'use client';

import { useRouter } from "next/navigation"; // Corrected import path
import { useCallback, useState } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";


interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      router.push('/everylisting');
    }
  }, [loginModal, router, currentUser]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      rentModal.onOpen();
    }
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
          onClick={toggleOpen} // Assuming you want to make the profile clickable
        >
         Items from WhatsApp
        </div>
       
      </div>
    </div>
  );
}

export default UserMenu;
