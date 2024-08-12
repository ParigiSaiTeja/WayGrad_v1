import { create } from 'zustand';

interface RentModalStore {
  isOpen: boolean;
  step: number;
  onOpen: () => void;
  onClose: () => void;
  setStep: (step: number) => void; // Function to set the current step
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  step: 0, // Initial step
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setStep: (step) => set({ step }) // Update step state
}));

export default useRentModal;
