'use client';
import { SafeUser } from "@/app/types";
import React from "react";
import Container from "../Container";
import Community from "./Community";
import Home from "./Home";
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

            {/* Flex container for the sell-related components, hidden on mobile */}
            <div className="hidden md:flex flex-row items-center gap-20">
              <SellBox currentUser={currentUser} />
              <StudentEss currentUser={currentUser} />
              <Housing currentUser={currentUser} />
              <Community currentUser={currentUser} />
              <Home currentUser={currentUser} />
             
            </div>

            {/* User menu, displayed on all screen sizes */}
            <div className="flex md:hidden">
              <UserMenu currentUser={currentUser} />
            </div>

            {/* User menu, hidden on mobile */}
            <div className="hidden md:flex">
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
