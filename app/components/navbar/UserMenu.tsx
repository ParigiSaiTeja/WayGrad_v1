'use client';

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const handleOptionClick = useCallback((option: 'listings' | 'whatsapp') => {
    if (option === 'listings') {
      router.push('/everylisting');
    } else if (option === 'whatsapp') {
      router.push('/everywhatsapplisting');
    }
    setShowOptions(false);
    setIsOpen(false); // Close the main menu when an option is clicked
  }, [router]);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
    setIsOpen(false); // Close the main menu when renting
  }, [loginModal, rentModal, currentUser]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      setShowOptions(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen || showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, showOptions, handleClickOutside]);

  const handleLogout = useCallback(async () => {
    await signOut();
    router.push('/'); // Redirect to homepage after logout
    setIsOpen(false); // Close the menu after logout
  }, [router]);

  const handleSubletClick = useCallback(() => {
    window.open('https://linktr.ee/waygrad', '_blank');
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={() => setShowOptions(true)}>
          {/* Extra options button for mobile mode */}
        </div>
        <div onClick={toggleOpen} className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={'/images/avatar.jpg'} />
          </div>
        </div>
      </div>
      {showOptions && (
        <div className="absolute rounded-xl shadow-md w-[60vw] md:w-4/5 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <div onClick={() => handleOptionClick('listings')} className="p-3 hover:bg-neutral-100 transition">
              From Listings
            </div>
            <div onClick={() => handleOptionClick('whatsapp')} className="p-3 hover:bg-neutral-100 transition">
              From WhatsApp Listings
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer md:flex-row">
            {currentUser ? (
              <>
                <div className="md:hidden">
                  {/* Mobile mode items */}
                  <MenuItem label="Home" onClick={() => { router.push('/'); setIsOpen(false); }} />
                  <hr/>
                  <MenuItem label="Buy Items" onClick={() => { router.push('/marketplace'); setIsOpen(false); }} />
                  <MenuItem label="Sell Items" onClick={() => { rentModal.onOpen(); setIsOpen(false); }} />
                  <MenuItem label="Housing" onClick={() => { router.push('/housing'); setIsOpen(false); }} />
                  <MenuItem label="Wiki Grad" onClick={() => { router.push('/essentials'); setIsOpen(false); }} />
                  <MenuItem label="Community" onClick={handleSubletClick} />
                  <hr/>
                  <MenuItem label="My Bids" onClick={() => { router.push('/favorites'); setIsOpen(false); }} />
                  <MenuItem label="My Listings" onClick={() => { router.push('/properties'); setIsOpen(false); }} />
                  
                  <hr/>
                  <MenuItem label="Profile" onClick={() => { router.push('/profilepage'); setIsOpen(false); }} />
                  <MenuItem label="Logout" onClick={handleLogout} />
                </div>
                <div className="hidden md:flex flex-col">
                  {/* Website mode items */}
                  <MenuItem label="My Bids" onClick={() => { router.push('/favorites'); setIsOpen(false); }} />
                  <MenuItem label="My Listings" onClick={() => { router.push('/properties'); setIsOpen(false); }} />
                  <hr/>
                  <MenuItem label="Profile" onClick={() => { router.push('/profilepage'); setIsOpen(false); }} />
                  <MenuItem label="Logout" onClick={handleLogout} />
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex flex-col">
                  {/* Website mode Login and Sign up items */}
                  <MenuItem label="Login" onClick={() => { loginModal.onOpen(); setIsOpen(false); }} />
                  <MenuItem label="Sign up" onClick={() => { registerModal.onOpen(); setIsOpen(false); }} />
                </div>
                <div className="md:hidden">
                  {/* Mobile mode Login and Sign up items */}
                  <MenuItem label="Login" onClick={() => { loginModal.onOpen(); setIsOpen(false); }} />
                  <MenuItem label="Sign up" onClick={() => { registerModal.onOpen(); setIsOpen(false); }} />
                  <MenuItem label="Marketplace" onClick={() => { router.push('/marketplace'); setIsOpen(false); }} />
                
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
