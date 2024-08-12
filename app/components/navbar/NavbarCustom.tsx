// NavbarCustom.tsx
'use client';
import { SafeUser } from "@/app/types";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import SellBox from "./SellBox";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const NavbarCustom: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-md">
      <div className="py-2 border-b-[0px] border-gray-800">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <SellBox currentUser={currentUser} />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavbarCustom;
