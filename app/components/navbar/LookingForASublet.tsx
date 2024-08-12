'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import SubletModal from "../modals/SubletModal"; // Import SubletModal

interface LookingForASubletProps {
  currentUser?: SafeUser | null;
}

const LookingForASublet: React.FC<LookingForASubletProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  
  const [isSubletModalOpen, setIsSubletModalOpen] = useState(false);
  const [subletModalStep, setSubletModalStep] = useState(0); // Manage steps

  const toggleSubletModal = useCallback(() => {
    setIsSubletModalOpen(prev => !prev);
  }, []);

  const onSublet = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }
    setSubletModalStep(0); // Reset to first step
    toggleSubletModal();
  }, [currentUser, loginModal, toggleSubletModal]);

  // Manage steps
  const onBack = () => {
    setSubletModalStep(prev => prev - 1);
  };

  const onNext = () => {
    setSubletModalStep(prev => prev + 1);
  };

  const handleSubmit = (data: any) => {
    if (subletModalStep !== 6) {
      onNext();
    } else {
      // Handle form submission
      console.log('Form data:', data);
      // Reset modal state
      setIsSubletModalOpen(false);
      setSubletModalStep(0);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div 
          onClick={onSublet}
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
        >
          Post a Sublet
        </div>
      </div>

      {isSubletModalOpen && (
        <SubletModal
          isOpen={isSubletModalOpen}
          onClose={() => setIsSubletModalOpen(false)}
          step={subletModalStep}
          onBack={onBack}
          onNext={onNext}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default LookingForASublet;

