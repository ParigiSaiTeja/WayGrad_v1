import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings, { IListingsParams } from "@/app/actions/getListings";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";
import ClientOnly from "../components/ClientOnly";
import BuyFromBid from "../components/navbar/BuyFromBid";
import Search from "../components/navbar/Search";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  try {
    const listings = await getListings(searchParams);
    const currentUser = await getCurrentUser();

    // Filter listings to only include visible ones
    const visibleListings = listings.filter(listing => listing.visible);

    if (visibleListings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    return (
   
      <ClientOnly>
      

        <Container>
          <div className="flex flex-col items-center gap-0  w-full max-w-full">
            <div className="w-full max-w-full">
              <div className="flex flex-col gap-0  px-4 w-full max-w-full">
                <BuyFromBid />
              
               
              </div>
              <Search currentUser={currentUser} />
           <br />
            </div>
          </div>

          <div className="text-2xl font-bold text-gray-900 mb-6">
            Items for Instant Buy
          </div>

          {visibleListings.length > 0 && (
            <div className="mb-12">
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Total items found: {visibleListings.length}
              </div>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {visibleListings.map((listing) => (
                  <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                    imageSize="medium"
                  />
                ))}
              </div>
            </div>
          )}
        </Container>
      </ClientOnly>
    );
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    return (
      <ClientOnly>
        <EmptyState title="Error" subtitle="Failed to fetch listings. Please try again later." />
      </ClientOnly>
    );
  }
}

export default Home;
