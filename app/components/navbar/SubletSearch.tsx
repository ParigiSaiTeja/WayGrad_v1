'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { BiSearch } from 'react-icons/bi';

import useLoginModal from '@/app/hooks/useLoginModal';
import useSearchModal from '@/app/hooks/useSearchModal';
import useUniversity from '@/app/hooks/useUniversity';
import { SafeUser } from '@/app/types';

interface SearchProps {
  currentUser?: SafeUser | null;
}

const Search: React.FC<SearchProps> = ({ currentUser }) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const loginModal = useLoginModal();
  const { getUniversityLabel } = useUniversity(); // Assuming you have a hook for university labels

  const universityValue = new URLSearchParams(window.location.search).get('university');
  const category = new URLSearchParams(window.location.search).get('category');

  const universityLabel = universityValue
    ? getUniversityLabel(universityValue) || ''
    : ''; // Default text

  const categoryLabel = category || 'Buy item'; // Default text

  const onSearchClick = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen(); // Open login modal if user is not logged in
    } else {
      searchModal.onOpen(); // Open search modal if user is logged in
    }
  }, [currentUser, loginModal, searchModal]);

  return (
    <div className="flex justify-center">
      <div
        onClick={onSearchClick}
        className="
          border-[1px] 
          w-64 /* Fixed width for medium size */
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

export default Search;
