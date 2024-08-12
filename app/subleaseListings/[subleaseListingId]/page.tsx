import getCurrentUser from "@/app/actions/getCurrentUser";
import getSubleaseListingById from "@/app/actions/getSubleaseListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  subleaseListingId?: string;
}

const SubleaseListingPage = async ({ params }: { params: IParams }) => {
  const subleaseListing = await getSubleaseListingById(params);
  const currentUser = await getCurrentUser();

  if (!subleaseListing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div>
        Hello
      </div>
    </ClientOnly>
  );
};

export default SubleaseListingPage;
