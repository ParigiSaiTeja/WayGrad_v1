// app/page.tsx
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import getCurrentUser from "@/app/actions/getCurrentUser";


const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
  }

  
  

  return (
    <ClientOnly>
      <div>
        Hello
      </div>
     
      
    </ClientOnly>
  );
}

export default PropertiesPage;
