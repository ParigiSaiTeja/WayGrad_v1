import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
        toast.success('Item removed from bids', { duration: 5000 });
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
        toast.success('Item added to my bids', { duration: 5000 });
      }

      await request();
      router.refresh();
       // Increased the duration to 5000ms (5 seconds)
    } catch (error) {
      toast.error('Something went wrong.'); // Increased the duration to 5000ms (5 seconds)
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router]);

  return {
    hasFavorited,
    toggleFavorite,
  };
}

export default useFavorite;
