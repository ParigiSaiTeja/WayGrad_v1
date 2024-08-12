'use client';
import { SafeUser } from "@/app/types";
import React from "react";
import Container from "../Container";
import Housing from "./Housing";
import Logo from "./Logo";
import SellBox from "./SellBox";
import StudentEss from "./StudentEss";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-md">
      <div className="py-2 border-b-[0px] border-gray-800">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* Flex container for the sell-related components */}
            <div className="flex flex-row items-center gap-20">
            <SellBox currentUser={currentUser} />
             
              <StudentEss currentUser={currentUser} />

              <Housing currentUser={currentUser} />
              


            </div>
            {/* User menu on the right */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Mobile Navbar (hidden on medium and larger screens) */}
      
    </div>
  );
};

export default Navbar;
