import { Listing, Reservation, SubleaseListing, User } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
  university: string; // Add this line
  imageSrc: string[];
  user: SafeUser;
  data?: SafeListing; 
  amazonLink?: string | null; 
  visible: boolean;
  isBid:boolean;
  
  
};

export type SafeReservation = Omit<
  Reservation, 
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "phonenumber" | "name"
> & {
  createdAt: string;
  updatedAt: string;
  
  phonenumber: string|null;
  name: string| null;
  emailVerified: boolean;
};

export type SafeSubleaseListing = Omit<SubleaseListing, "createdAt" | "updatedAt" | "location"> & {

  id: string;
  gender: string;
  location: string;
  roomType: string;
  leaseType: string;
  imageSrc: string[];
  price: number;
  createdAt: string;
  utilities: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  startingFrom: string;
  tillDate: string;
  university: string;
  user: SafeUser; // Assuming endDate is expected to be a string in the safe type

  
  
};

export interface SafeMessage {
  id: string;
  from: string;
  body: string;
  categories: string[];
};
export interface IMessageParams {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  keyword?: string;
  category?: string; 
}
export interface ISubleasesParams {
  category?: string;
  location?: string;
  university?: string;
  
  // Add any other fields specific to sublease searches
}

export interface IListingParams {
  category?: string;
  location?: string;
  university?: string;
  
  // Add any other fields specific to sublease searches
}



