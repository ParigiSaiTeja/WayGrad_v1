'use client';

import useUniversitySearchModal from "@/app/hooks/useUniversitySearchModal";
import React from "react";
import Modal from "./Modal";

const UniversitySearchModal= () => {

  const universitySearchModal=useUniversitySearchModal();
return (
  <Modal
    isOpen={universitySearchModal.isOpen}
    title="Filters"
   actionLabel="Search"
    onSubmit={universitySearchModal.onOpen}
   // No secondary action
    onClose={universitySearchModal.onClose}
   
  />
);

}