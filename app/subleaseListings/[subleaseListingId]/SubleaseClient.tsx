'use client';

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeSubleaseListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import SubleaseListingHead from "@/app/components/sublets/SubleaseListingHead";
import SubleaseListingInfo from "@/app/components/sublets/SubleaseListingInfo";

interface SubleaseListingClientProps {
  subleaseListing: SafeSubleaseListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const SubleaseListingClient: React.FC<SubleaseListingClientProps> = ({
  subleaseListing,
  currentUser
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onContactOwner = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    // Placeholder for actual contact logic (e.g., API call to send a message)
    setTimeout(() => {
      toast.success('Contact request sent!');
      setIsLoading(false);
    }, 1500);  // Simulating an API call delay
  }, [currentUser, loginModal]);

  return ( 
    <Container>
      <div 
        className="
          flex 
          flex-col 
          items-center 
          max-w-screen-lg 
          mx-auto
          px-4
          md:px-0
        "
      >
        <div className="flex flex-col gap-6 w-full">
          <SubleaseListingHead
            gender={subleaseListing.gender}
            imageSrc={subleaseListing.imageSrc}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              gap-6
              mt-6 
              w-full
            "
          >
            <SubleaseListingInfo
              user={subleaseListing.user}
              price={subleaseListing.price}
              roomCount={subleaseListing.roomCount}
              guestCount={subleaseListing.guestCount}
              bathroomCount={subleaseListing.bathroomCount}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SubleaseListingClient;
