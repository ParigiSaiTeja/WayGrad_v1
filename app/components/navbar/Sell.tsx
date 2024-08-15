'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import toast from "react-hot-toast";


interface SellProps {
  currentUser?: SafeUser | null
}

const Sell: React.FC<SellProps> = ({
  currentUser
}) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      toast.error('You need to Login First.');
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return ( 
    <div className="flex ">
      <div className="flex text-l ">
        <div 
          onClick={onRent}
          className="
           
            text-l
            md:block
            text-sm 
            font-semibold 
            
            
            rounded-full 
            hover:bg-neutral-100 
            transition 
            
            cursor-pointer underline hover:text-black
          "
        >
          Want to Sell Instead?
        </div>
        
      </div>
     
    </div>
   );
}
 
export default Sell;