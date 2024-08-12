'use client';

import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useCallback, useMemo, useState } from "react";
import Heading from '../Heading';
import CategorySelect from '../inputs/CategorySelect';
import Modal from "./Modal";

enum STEPS {
  CATEGORY = 0,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [university, setUniversity] = useState<string | undefined>(undefined);

  const onNext = useCallback(() => {
    setStep(STEPS.CATEGORY); // Only one step now
  }, []);

  const onSubmit = useCallback(() => {
    const currentUrl = window.location.href; // Get the current URL
    const currentQuery = qs.parse(window.location.search); // Parse query parameters from current URL

    const updatedQuery: any = {
      ...currentQuery,
      category,
      university,
    };

    const newUrl = qs.stringifyUrl({
      url: currentUrl.split('?')[0], // Remove current query parameters
      query: updatedQuery,
    }, { skipNull: true });

    searchModal.onClose();
    router.push(newUrl);
  }, [searchModal, router, category, university]);

  const actionLabel = useMemo(() => {
    return 'Search'; // Only one action
  }, []);

  const secondaryActionLabel = useMemo(() => {
    return undefined; // No secondary action
  }, []);

  let bodyContent;

  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Select filters"
            subtitle="Choose a category and university to filter your search."
          />
          <CategorySelect 
            value={category}
            onChange={(value) => setCategory(value as string)} 
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
