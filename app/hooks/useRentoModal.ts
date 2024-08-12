import { create } from 'zustand';

interface RentoModalStore {
  isOpen: boolean;
  step: number;
  onOpen: () => void;
  onClose: () => void;
  
}

const useRentoModal = create<RentoModalStore>((set) => ({
  isOpen: false,
  step: 0, // Initial step
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  
}));

export default useRentoModal;
