import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const NewModal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg">
        <p className='text-black'> Privacy Policy</p>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className='text-black'> WayGrad LLC ("WayGrad," "we," "us," or "our") respects your privacy and is committed to protecting it through our compliance with this Privacy Policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website (the "Site") and our practices for collecting, using, maintaining, protecting, and disclosing that information.
Please read this policy carefully to understand our views and practices regarding your information and how we will treat it. By using our Site, you agree to the terms of this Privacy Policy.
</p>
        <div className="max-h-80 overflow-auto mb-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NewModal;
