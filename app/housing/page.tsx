import { IListingsParams } from "@/app/actions/getListings";

import React from "react";
import ClientOnly from "../components/ClientOnly";
import HouseEmptyState from "../components/HouseEmptyState";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  
    

  
    return (
   
      <ClientOnly>
      

        
       <HouseEmptyState />
      </ClientOnly>
    );
  
  
}

export default Home;
