'use client';

import Carousel from '@/app/components/navbar/Carousel';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import React, { useCallback } from 'react';

export default function Home() {
  const registerModal = useRegisterModal();

  const onRent = useCallback(() => {
    registerModal.onOpen();

    // Assuming registerModal.onOpen() returns a promise that resolves upon successful registration
    
  }, [registerModal]);
  const images = ['/images/2.svg', '/images/3.svg', '/images/4.svg'];
  const logos = [
    '/images/u1.png', '/images/u2.jpeg', '/images/u4.png', '/images/u6.png', '/images/u10.png',
    '/images/u12.png', '/images/u13.png', '/images/u12.jpg', '/images/u1.png', '/images/u2.jpeg',
    '/images/u4.png', '/images/u6.png', '/images/u10.png', '/images/u12.png', '/images/u13.png'
  ];

  const desktopImages = [
    '/images/q1.svg',
    '/images/q2.svg',
    '/images/q3.svg',
    '/images/q4.svg',
  ];

  const desktopImages1 = [
    '/images/g2.svg',
  ];
  const desktopImages2 = [
    '/images/g6.svg',
  ];
  const mobileImagesFront = ['/images/x1.svg', '/images/x2.svg', '/images/x3.svg', '/images/x4.svg'];
  const mobileImagesFront1 = ['/images/g1.svg'];

  // Define the links corresponding to each image in the carousel
  const serviceLinks = [
    '/marketplace',
    '/',
    '/',
    '/',
  ];
  const serviceLinks1= [
    'https://calendly.com/hari-waygrad/30mins',
    
  ];
  return (
    <div className="flex flex-col items-center gap-4">
     

      <div className="flex flex-col  ">
       
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          {/* Desktop Carousel */}
          <div className="hidden md:block relative">
  <Carousel
    images={desktopImages2}
    interval={7000}
    width="w-full md:w-[500px] lg:w-[1445px]"
    height="h-80 md:h-[200px] lg:h-[750px]"
    links={serviceLinks} // Pass the links to the Carousel component
    className="rounded-lg"
  />
  {/* Add the button */}
 
</div>
          {/* Mobile Carousel */}
          <div className="block md:hidden w-full max-w-[1000px] mx-auto">
            <Carousel
              images={mobileImagesFront}
              interval={7000}
              width="w-[26rem]"    // Full width of the container
              height="h-[32rem]"
              links={serviceLinks}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>




      <div className="flex flex-col gap-4 mt-8">
        <div className="text-center text-2xl font-bold mb-4">Our Services</div>
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          {/* Desktop Carousel */}
          <div className="hidden md:block relative">
  <Carousel
    images={desktopImages}
    interval={7000}
    width="w-full md:w-[500px] lg:w-[1100px]"
    height="h-80 md:h-[200px] lg:h-[650px]"
    links={serviceLinks} // Pass the links to the Carousel component
    className="rounded-lg"
  />
  {/* Add the button */}
 
</div>
          {/* Mobile Carousel */}
          <div className="block md:hidden w-full max-w-[1000px] mx-auto">
            <Carousel
              images={mobileImagesFront}
              interval={7000}
              width="w-[26rem]"    // Full width of the container
              height="h-[32rem]"
              links={serviceLinks}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="text-center text-2xl font-bold mb-4"></div>
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          {/* Desktop Carousel */}
          <div className="hidden md:block">
            <Carousel
              images={desktopImages1}
              interval={7000}
              width="w-full md:w-[500px] lg:w-[1500px]"
              height="h-80 md:h-[200px] lg:h-[700px]"
              links={serviceLinks1} // Pass the links to the Carousel component
              className="rounded-6xl"
            />
            
          </div>
          {/* Mobile Carousel */}
          <div className="block md:hidden w-full max-w-[1000px] mx-auto">
            <Carousel
              images={mobileImagesFront1}
              interval={7000}
              width="w-[26rem]"    // Full width of the container
              height="h-[32rem]"
              links={serviceLinks1}
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-2xl font-bold text-gray-800 mt-4">Testimonials</div>
      <Carousel
        images={images}
        interval={5000}
        width="w-full md:w-[200px] lg:w-[700px]"
        height="h-80 md:h-[200px] lg:h-[500px]"
        className="rounded-lg"
      />
    </div>
  );
}