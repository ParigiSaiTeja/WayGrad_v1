import { create } from 'zustand';

interface SearchModalStoreBid {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModalBid = create<SearchModalStoreBid>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSearchModalBid;
