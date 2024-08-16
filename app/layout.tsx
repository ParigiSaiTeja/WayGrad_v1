import ForgotPasswordModal from '@/app/components/modals/ForgotPasswordModal';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import RentModal from '@/app/components/modals/RentModal';
import SearchModal from '@/app/components/modals/SearchModal';
import Navbar from '@/app/components/navbar/Navbar';
import { Analytics } from "@vercel/analytics/react";
import { Nunito } from 'next/font/google';

import ToasterProvider from '@/app/providers/ToasterProvider';

import React from 'react';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/navbar/Footer';
import './globals.css';

export const metadata = {
  title: 'WayGrad',
  description: 'Your Study Abroad Partner',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
       <body className={`${font.className} black-bg flex flex-col min-h-screen`}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <ForgotPasswordModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          
        </ClientOnly>
        <div className="flex-grow pb-15 pt-20">
          {children}
          <Analytics />
        </div>
        
        <Footer />
      </body>
    </html>
  )
}
