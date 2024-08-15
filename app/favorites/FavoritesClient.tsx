import { SafeListing, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCardBid from "@/app/components/listings/ListingCardBid";

interface FavoritesClientProps {
  listings: SafeListing[],
  currentUser?: SafeUser | null,
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser
}) => {
  return (
    <Container>
      <Heading
        title="Your Bids"
        subtitle="List of all the bids that you have placed!"
      />
      <div 
        className="
          mt-10
          grid 
          grid-cols-1 
          gap-8
          mb-4
        "
      >
        {listings.reverse().map((listing: any) => (
          <ListingCardBid
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            imageSize="medium"
          />
        ))}
      </div>
    </Container>
  );
}
 
export default FavoritesClient;
