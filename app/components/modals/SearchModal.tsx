'use client';

import CategorySelect from "@/app/components/inputs/categorySelect"; // Import the CategorySelect component
import UniversitySelect from "@/app/components/inputs/universitySelect";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback, useMemo, useState } from "react";
import Heading from '../Heading';
import Modal from "./Modal";

enum STEPS {
  university = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.university);
  const [university, setUniversity] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<string | undefined>(undefined); // Add state for category

  const onNext = useCallback(() => {
    setStep(STEPS.university); // Only one step now
  }, []);

  const onSubmit = useCallback(() => {
    const currentUrl = window.location.href; // Get the current URL
    const currentQuery = qs.parse(window.location.search); // Parse query parameters from current URL

    const updatedQuery: any = {
      ...currentQuery,
      university,
      category, // Add category to query parameters
    };

    const newUrl = qs.stringifyUrl({
      url: currentUrl.split('?')[0], // Remove current query parameters
      query: updatedQuery,
    }, { skipNull: true });

    searchModal.onClose();
    router.push(newUrl);
  }, [searchModal, router, university, category]);

  const actionLabel = useMemo(() => {
    return 'Search'; // Only one action
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return undefined; // No secondary action
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
            onChange={(value) => setCategory(value as string)} // Add category select component
          />
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
      secondaryAction={undefined} // No secondary action
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
}

export default SearchModal;
