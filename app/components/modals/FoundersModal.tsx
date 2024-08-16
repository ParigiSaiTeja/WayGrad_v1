'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FoundersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FoundersModal: React.FC<FoundersModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        <button 
          className="absolute top-2 right-2 text-gray-600 hover:text-black transition-colors duration-300"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Meet Our Founders</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Image src="/images/found1.jpg" alt="Founder 1" width={100} height={100} className="rounded" />
            <h3 className="text-xl font-semibold mt-4">Sai Teja Reddy</h3>
            <p className="text-center mt-2">As CTO of WayGrad, Sai Teja oversees technology development, ensuring a seamless, secure, and user-friendly experience for all WayGrad users.</p>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.linkedin.com/in/sai-teja-reddy/" target="_blank" rel="noopener noreferrer">
                <Image src='/images/linkedin2.png' alt='LinkedIn' width={24} height={24} />
              </Link>
              <Link href="https://twitter.com/sai_teja" target="_blank" rel="noopener noreferrer">
                <Image src='/images/mail2.png' alt='Twitter' width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/sai_teja/" target="_blank" rel="noopener noreferrer">
                <Image src='/images/insta2.png' alt='Instagram' width={24} height={24} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Image src="/images/founder2.png" alt="Founder 2" width={150} height={150} className="rounded-full" />
            <h3 className="text-xl font-semibold mt-4">Founder 2</h3>
            <p className="text-center mt-2">As CEO of WayGrad, SriHari leads the vision and strategy, driving innovation in building a community-driven platform where students can easily buy and sell items.</p>
            <div className="flex gap-4 mt-4">
              <Link href="https://www.linkedin.com/in/founder2/" target="_blank" rel="noopener noreferrer">
                <Image src='/images/linkedin2.png' alt='LinkedIn' width={24} height={24} />
              </Link>
              <Link href="https://twitter.com/founder2" target="_blank" rel="noopener noreferrer">
                <Image src='/images/mail2.png' alt='Twitter' width={24} height={24} />
              </Link>
              <Link href="https://www.instagram.com/founder2/" target="_blank" rel="noopener noreferrer">
                <Image src='/images/insta2.png' alt='Instagram' width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FoundersModal;
