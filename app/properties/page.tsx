// app/page.tsx
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import getBidListings from "@/app/actions/getBidListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";
import React from "react";
import Categories from "../components/navbar/Categories";
import PropertiesClient from "./PropertiesClient";
import PropertiesClient1 from "./PropertiesClient1";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  const listings = await getListings({ userId: currentUser.id });
  const bidlistings = await getBidListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listings found"
          subtitle="Looks like didn't list any item."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Categories />
     
      <PropertiesClient
        listings={listings}
        
        
       
        currentUser={currentUser}
      />
      <br/>
      <PropertiesClient1
        listings={bidlistings}
        
        
       
        currentUser={currentUser}
      />

    </ClientOnly>
  );
}

export default PropertiesPage;
