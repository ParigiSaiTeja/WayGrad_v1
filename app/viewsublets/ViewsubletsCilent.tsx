'use client';

import axios from "axios";
import { useRouter } from "next/navigation"; // Corrected import path for useRouter
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FaShareAlt } from "react-icons/fa"; // Importing a share icon

import { SafeSublease, SafeUser } from "@/app/types"; // Assuming SafeSublease is defined similarly to SafeListing

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import SubleaseCard from "@/app/components/sublets/SubletCard"; // Assuming this component exists
import React from "react";

interface SubleaseClientProps {
  subleases: SafeSublease[],
  currentUser?: SafeUser | null,
}

const SubleaseClient: React.FC<SubleaseClientProps> = ({
  subleases,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onDelete = useCallback((id: string) => {
    setDeletingId(id);

    axios.delete(`/api/subleaselistings/${id}`)
      .then(() => {
        toast.success('Sublease deleted');
        router.reload(); // Use reload instead of refresh, which is not a method of Next Router
      })
      .catch((error) => {
        toast.error(error?.response?.data?.error)
      })
      .finally(() => {
        setDeletingId('');
      })
  }, [router]);

  const onShare = () => {
    const subleaseDetails = subleases.map(sublease => {
      // Parse the location JSON string if it's a string
      let location: { label: string } | null = null;
      if (typeof sublease.location === 'string') {
        try {
          location = JSON.parse(sublease.location);
        } catch (e) {
          console.error('Failed to parse location', e);
        }
      }

      const startDate = new Date(sublease.startingFrom).toLocaleDateString();
      const endDate = new Date(sublease.tillDate).toLocaleDateString();

      return `Gender: ${sublease.gender}\nRoom Type: ${sublease.roomType}\nUtilities Included: ${sublease.utilities}\nSublet Type: ${sublease.leaseType}\nLocation: ${sublease.location || 'Unknown'}\nPrice: $${sublease.price}\nAvailable from: ${startDate} to ${endDate}\n${window.location.origin}/subleaseListings/${sublease.id}`;
    }).join('\n\n');

    const shareText = `Check out these sublease listings:\n\n${subleaseDetails}`;

    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: shareText,
        url: window.location.href,
      })
        .then(() => toast.success('Page shared successfully!'))
        .catch((error) => toast.error('Failed to share the page.'));
    } else {
      // Fallback for browsers that do not support the Web Share API
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success('Links copied to clipboard!'))
        .catch(() => toast.error('Failed to copy the links.'));
    }
  };

  return (
    <Container>
      <div className="flex justify-between items-center">
        <Heading
          title="Subleases"
          subtitle="Browse available subleases"
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
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {subleases.map((sublease) => (
          <SubleaseCard
            key={sublease.id}
            data={sublease}
            actionId={sublease.id}
            onAction={onDelete}
            disabled={deletingId === sublease.id}
            actionLabel="Delete Sublease"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}

export default SubleaseClient;
