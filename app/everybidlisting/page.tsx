import getBidListings, { IListingsParams } from "@/app/actions/getBidListings";
import getCurrentUser from "@/app/actions/getCurrentUser";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCardBid from "@/app/components/listings/ListingCardBid";
import { SafeUser } from "@/app/types";
import ClientOnly from "../components/ClientOnly";
import BuyFromListing from "../components/navbar/BuyFromListing";
import Search from "../components/navbar/Search";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  try {
    const listings = await getBidListings(searchParams);
    const currentUser = await getCurrentUser();

    // Ensure that currentUser matches the expected type
    const safeCurrentUser: SafeUser | undefined = currentUser
      ? {
          ...currentUser,
          name: currentUser.name ?? "Unknown", // Default value if null
          email: currentUser.email ?? "",
          phonenumber: currentUser.phonenumber ?? "",
          university: currentUser.university ?? "",
          city: currentUser.city ?? "",
        }
      : undefined;

    if (listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      );
    }

    return (
      <ClientOnly>
        <Container>
        <div className="flex flex-col items-center gap-0 w-full max-w-full">
            <div className="w-full max-w-full">
              <div className="flex flex-col gap-0 px-4 w-full max-w-full">
              <BuyFromListing />
             
             
            </div>
           
              <Search currentUser={safeCurrentUser} />
            </div>
            <br />
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-2">
            Listings for Auction
          </div>
          <p
      className="text-l text-gray-700 mb-2 cursor-pointer underline hover:text-black"
     
    >
      Want to Sell Instead?
    </p>

          <div className="mb-12">
            <div className="text-lg text-right font-semibold text-gray-700 mb-2">
               Listings found: {listings.length}
            </div>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {listings.map((listing) => (
                <ListingCardBid
                  currentUser={currentUser}
                  key={listing.id}
                  data={listing}
                  imageSize="medium"
                />
              ))}
            </div>
          </div>
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
