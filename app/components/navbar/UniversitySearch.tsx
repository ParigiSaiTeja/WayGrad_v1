'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';

import useLoginModal from '@/app/hooks/useLoginModal';
import useUniversitySearchModal from '@/app/hooks/useUniversitySearchModal';
import { SafeUser } from '@/app/types';
import React from 'react';

interface UniversitySearchProps {
  currentUser?: SafeUser | null;
}

const UniversitySearch: React.FC<UniversitySearchProps> = ({ currentUser }) => {
  const router = useRouter();
  const universitySearchModal = useUniversitySearchModal();
  const loginModal = useLoginModal();

  const universityValue = new URLSearchParams(window.location.search).get('university');
  const category = new URLSearchParams(window.location.search).get('category');

  const universityLabel = universityValue || 'Select university';
  const categoryLabel = category || 'Select category';

  const onSearchClick = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
    } else {
      universitySearchModal.onOpen();
    }
  }, [currentUser, loginModal, universitySearchModal]);

  return (
    <div className="flex justify-center">
      <div
        onClick={onSearchClick}
        className="
          border-[1px] 
          w-64
          py-2 
          rounded-full 
          shadow-sm 
          hover:shadow-md 
          transition 
          cursor-pointer
        "
      >
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
          "
        >
          <div 
            className="
              text-sm 
              font-semibold 
              px-6
            "
          >
            {universityLabel}
          </div>
          <div 
            className="
              hidden 
              sm:block 
              text-sm 
              font-semibold 
              px-6 
              flex-1 
              text-center
            "
          >
            {categoryLabel}
          </div>
          <div 
            className="
              text-sm 
              pl-6 
              pr-2 
              text-gray-600 
              flex 
              flex-row 
              items-center 
              gap-3
            "
          >
            <div 
              className="
                p-2 
                bg-rose-500 
                rounded-full 
                text-white
              "
            >
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UniversitySearch;
