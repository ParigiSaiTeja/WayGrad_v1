// pages/users/[userId].tsx

import { SafeListing } from "@/app/types";
import ListingCard from "@/components/ListingCard";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserListings = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [listings, setListings] = useState<SafeListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      axios.get(`/api/user/${userId}/listings`)
        .then(response => {
          setListings(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch listings:", error);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Listings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(listing => (
          <ListingCard key={listing.id} data={listing} currentUser={null} />
        ))}
      </div>
    </div>
  );
};

export default UserListings;
