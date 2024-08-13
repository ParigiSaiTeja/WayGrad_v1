'use client';

import CategorySelect from "@/app/components/inputs/CategorySelect";
import UniversitySelect from "@/app/components/inputs/UniversitySelect";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useEffect, useMemo, useState } from "react";
import Heading from '../Heading';
import ListingCardSearch from "../listings/ListingCardSearch";
import Modal from "./Modal";

enum STEPS {
  university = 0,
}

// Mock mapping of categories to listing IDs
const categoryToListingIdMap: { [key: string]: string } = {
  "AC": "66b927f8c8f381f5042190d0",
  "Bed": "66b927f8c8f381f5042190d0",
  "Chair": "66b927f8c8f381f5042190d0",
    "Table": "66b927f8c8f381f5042190d0",
    "Fan": "66b927f8c8f381f5042190d0",
  
    "Mattress": "66b927f8c8f381f5042190d0",
    "TV":"66b927f8c8f381f5042190d0",
    "Cycle":"66b927f8c8f381f5042190d0",
    "Monitor": "66b927f8c8f381f5042190d0",
    "Car": "66b927f8c8f381f5042190d0",
    "Couch":"66b927f8c8f381f5042190d0",
    "Books": "66b927f8c8f381f5042190d0",
    "Gigs": "66b927f8c8f381f5042190d0",
    "Clothes": "66b927f8c8f381f5042190d0",
    "Kitchen Appliances":"66b927f8c8f381f5042190d0",
    "Cookware": "66b927f8c8f381f5042190d0",
    "Garage Items": "66b927f8c8f381f5042190d0",
    "Others": "66b927f8c8f381f5042190d0",
  // Add more mappings as needed
};

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.university);
  const [university, setUniversity] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [listingId, setListingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Update listingId based on the selected category
    if (category) {
      const id = categoryToListingIdMap[category];
      setListingId(id);
    }
  }, [category]);

  const onNext = useCallback(() => {
    setStep(STEPS.university); // Only one step now
  }, []);

  const onSubmit = useCallback(() => {
    const currentUrl = window.location.href;
    const currentQuery = qs.parse(window.location.search);

    const updatedQuery: any = {
      ...currentQuery,
      university,
      category,
    };

    const newUrl = qs.stringifyUrl({
      url: currentUrl.split('?')[0],
      query: updatedQuery,
    }, { skipNull: true });

    searchModal.onClose();
    router.push(newUrl);
  }, [searchModal, router, university, category]);

  const actionLabel = useMemo(() => {
    return 'Search';
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return undefined;
  }, []);

  let bodyContent;

  switch (step) {
    case STEPS.university:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Select filters"
            subtitle="Choose a university and category to filter your search."
          />
          <UniversitySelect 
            value={university}
            onChange={(value) => setUniversity(value as string)} 
          />
          <CategorySelect
            value={category}
            onChange={(value) => setCategory(value as string)}
          />
          {listingId && (
            <div className="mt-2">
              <Heading title="A popular choice among students" />
              <ListingCardSearch listingId={listingId} category={category} /> {/* Pass category */}
            </div>
          )}
        </div>
      );
      break;
    default:
      bodyContent = <div>Invalid step</div>;
      break;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={undefined}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
