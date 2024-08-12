import { create } from 'zustand';

interface SearchModalStore1 {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal1 = create<SearchModalStore1>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useSearchModal1;
