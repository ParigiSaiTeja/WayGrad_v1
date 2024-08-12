import { create } from 'zustand';

interface SubletModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubletModal = create<SubletModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubletModal;
