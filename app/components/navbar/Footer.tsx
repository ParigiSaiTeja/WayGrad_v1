'use client';
import Modal from '@/app/components/modals/FoundersModal'; // Import the Modal component
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | string>('');

  const openModal = (content: JSX.Element | string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const founderContent = (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="text-center">
          <Image src="/images/founder1.jpg" alt="Founder 1" width={150} height={150} className="rounded-full" />
          <h3 className="text-xl font-bold mt-4">Founder 1 Name</h3>
          <p className="text-gray-700">Short bio or description of Founder 1.</p>
        </div>
        <div className="text-center">
          <Image src="/images/founder1.jpg" alt="Founder 2" width={150} height={150} className="rounded-full" />
          <h3 className="text-xl font-bold mt-4">Founder 2 Name</h3>
          <p className="text-gray-700">Short bio or description of Founder 2.</p>
        </div>
      </div>
    </div>
  );

  return (
    <footer className="relative w-full px-4 py-8 bg-black text-white flex flex-col lg:flex-row lg:justify-between lg:items-start box-border mt-auto">
      
      {/* LOGO, TEXT & SOCIAL MEDIA */}
      <div className="flex flex-col lg:w-1/3 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src='/images/traingle.png' alt='logo' width={50} height={50} />
            <h2 className="font-bold text-2xl">WayGrad</h2>
          </div>
          <p className="opacity-70">
            Your Study Abroad Partner
          </p>
        </div>
        {/* SOCIAL MEDIA LINKS */}
        <div className="flex gap-4 mt-4">
          <Link href="https://www.linkedin.com/company/waygrad/" target="_blank" rel="noopener noreferrer">
            <Image src='/images/linkedin2.png' alt='LinkedIn' width={30} height={30} />
          </Link>
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Image src='/images/mail2.png' alt='Gmail' width={30} height={30} />
          </Link>
          <Link href="https://www.instagram.com/waygrad/" target="_blank" rel="noopener noreferrer">
            <Image src='/images/insta2.png' alt='Instagram' width={30} height={30} />
          </Link>
        </div>
        {/* COPYRIGHT NOTICE */}
        <div className="text-sm mt-8 opacity-70">
          © 2024 WayGrad. All rights reserved.
        </div>
      </div>

      {/* LINK FOOTER */}
      <div className="flex flex-col lg:flex-row lg:w-2/3 gap-8 lg:gap-4 mt-8 lg:mt-0">
        <FooterCard title='Quick Links' links={[
          { text: 'Home', href: '/' },
          { text: 'MarketPlace', href: '/everylisting' },
          { text: 'Student Essentials', href: '/studentessentials' },
          { text: 'Housing', href: '/housing' },
          { text: 'Community', href: 'https://linktr.ee/waygrad', target: '_blank', rel: 'noopener noreferrer' }
        ]} />
        <FooterCard title='WayGrad' links={[
          { text: 'About Us', href: '/about' },
          { text: 'Founders', href: '#', onClick: () => openModal(founderContent) }, // Open the founders modal
          { text: 'Testimonials', href: '/testimonials' }
        ]} />
        <FooterCard 
          title='Legal' 
          links={[
            { text: 'Terms and Conditions', href: 'https://aqua-fancy-8.tiiny.site', onClick: () => openModal('Here are the terms and conditions...') },
            { text: 'Privacy Policy', href: 'https://gray-tori-8.tiiny.site/' }
          ]} 
        />
        <FooterCard title='Partner with Us' links={[
          { text: '+1 551 318 6492', href: 'tel:+1 5513186492' },
          { text: 'info@waygrad.com', href: 'mailto:info@waygrad.com' },
          { text: '565 49th St Brooklyn, NY 11220', href: '/contact' }
        ]} />
      </div>

      {/* Render the Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Founders">
        {modalContent}
      </Modal>
    
    </footer>
  );
};

interface FooterCardProps {
  title: string;
  links: { text: string, href: string, onClick?: () => void, target?: string, rel?: string }[];
}

const FooterCard = ({ title, links }: FooterCardProps) => {
  return (
    <div className="flex flex-col gap-4 lg:w-1/4">
      <h3 className="text-2xl font-bold">{title}</h3>
      <ul className="flex flex-col gap-2 mt-2">
        {links.map((link, index) => (
          <a 
            key={index} 
            href={link.href} 
            onClick={link.onClick} 
            className="opacity-70 hover:opacity-100 transition-opacity duration-300" 
            target={link.target} 
            rel={link.rel}
          >
            {link.text}
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
