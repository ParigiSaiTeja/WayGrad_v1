import { create } from 'zustand';

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUniversitySearchModal = create<SearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useUniversitySearchModal;
