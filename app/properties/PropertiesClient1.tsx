'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import { SafeListing, SafeUser } from "@/app/types";
import React from "react";
import ListingCardBid from "../components/listings/ListingCardBid";

interface PropertiesClient1Props {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const PropertiesClient1: React.FC<PropertiesClient1Props> = ({
  listings,
  currentUser
}) => {
  const router = useRouter();
  const [processingId, setProcessingId] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const onToggleVisibility = useCallback((id: string, visible: boolean) => {
    setProcessingId(id);

    axios.patch(`/api/listings/${id}`, { visible: !visible })
      .then(() => {
        toast.success(visible ? 'Listing hidden' : 'Listing restored');
        router.refresh();
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error || 'An error occurred');
      })
      .finally(() => {
        setProcessingId('');
      });
  }, [router]);

  const onShare = () => {
    const listingDetails = listings.map(listing => {
      // Use locationValue directly as it is already a string
      const location = listing.locationValue || 'Unknown';
  
      return `Category: ${listing.category}\nPrice: $${listing.price}\nLocation: ${location}\nLink: ${window.location.origin}/listings/${listing.id}`;
    }).join('\n\n');
  
    const shareText = `Check out these listings:\n\n${listingDetails}`;
  
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: shareText,
        url: window.location.href,
      })
        .then(() => toast.success('Page shared successfully!'))
        .catch(() => toast.error('Failed to share the page.'));
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success('Links copied to clipboard!'))
        .catch(() => toast.error('Failed to copy the links.'));
    }
  };
  

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      onToggleVisibility(confirmDeleteId, true); // Assuming we want to restore the listing
      setConfirmDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading
          title="List of your Bid Listings "
       
        />
        <button
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onShare}
          aria-label="Share this page"
        >
          <FaShareAlt size={24} />
        </button>
      </div>
      <div 
      className="
      mt-10
      grid 
      grid-cols-2 
      sm:grid-cols-3 
      md:grid-cols-4 
      lg:grid-cols-4 
      gap-8
    "
      >
        {listings.map((listing) => (
          <div key={listing.id} className="relative">
            <ListingCardBid
              data={listing}
              actionId={listing.id}
              onAction={() => {
                if (listing.visible) {
                  handleDeleteClick(listing.id);
                } else {
                  onToggleVisibility(listing.id, listing.visible);
                }
              }}
              disabled={processingId === listing.id}
              actionLabel={listing.visible ? "Delete Listing" : "Restore Listing"}
              currentUser={currentUser}
              imageSize="medium"
            />
           
          </div>

          
        ))}

        
      </div>
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this listing?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-white-300 text-grey rounded hover:bg-red-400"
                onClick={confirmDelete}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PropertiesClient1;
