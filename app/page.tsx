'use client';


import Carousel from '@/app/components/navbar/Carousel';
import UniversityCarousel from '@/app/components/navbar/UniversityCarousel';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
export default function Home() {
  const registerModal = useRegisterModal();
  const router = useRouter();

  const onRent = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const images = ['/images/2.svg', '/images/3.svg', '/images/4.svg'];
  const logos = [
    '/images/u1.png', '/images/u2.jpeg', '/images/u4.png', '/images/u6.png', '/images/u10.png',
     '/images/u13.png', '/images/u12.jpg', '/images/u1.png', '/images/u2.jpeg',
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

  const mobileImagesFront = ['/images/a0.svg', '/images/a7.svg', '/images/a2.svg', '/images/a4.svg'];
  const mobileImagesFront1 = ['/images/g1.svg'];

  const serviceLinks = [
    '/marketplace',
  ];

  const serviceLinks1 = [
    'https://calendly.com/hari-waygrad/30mins',
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      
      {/* Desktop "Get Early Access" section */}
      <div className="hidden md:flex flex-col md:flex-row items-center justify-between mt-8 w-full max-w-screen-xl px-4 md:px-8">
        <div className="flex-1 text-left md:text-left md:pr-8 order-1 md:order-1 flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-6xl mb-8">Get Early Access to Beta Version Today</h1>
          <p className="text-xl text-gray-700 mb-4">
            <strong><em className="text-black">Prepare for Arrival:</em></strong><br />
            Access WikiGrad for our exclusive How-To section, college application help, and useful tips to guide your transition.
          </p>
          <p className="text-xl text-gray-700 mb-4">
            <strong><em className="text-black">Settle In and Thrive:</em></strong><br />
            Explore our Marketplace for deals and auctions on pre-owned furniture, get ready for our upcoming student housing section, and share experiences on WikiGrad.
          </p>
          <button
            onClick={onRent}
            className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300 mb-6"
          >
            Sign Up Now!
          </button>

          <button
            onClick={() => router.push('/marketplace')}
            className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300 mb-6"
          >
            Explore Marketplace!
          </button>
          <p className="text-xl font-bold text-gray-800 mb-4">
            Join the community shaping the future for international students.
          </p>
        </div>
        <div className="flex-1 md:mt-0 w-full order-2 md:order-2 flex flex-col items-center md:items-start">
          <Image
            src="/images/y3.svg"
            alt="Descriptive Alt Text"
            className="w-full h-[120vh] object-cover mb-8 rounded-lg"
            layout="responsive"
            width={2000}
            height={400}
          />
        </div>
      </div>

      {/* "Get Early Access" section for mobile */}
      <div className="block md:hidden w-full max-w-screen-xl px-4 md:px-8 mt-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl mb-8">Get Early Access to Beta Version Today</h1>
          <p className="text-l font-lato text-gray-700 mb-4">For easy marketplace access, streamlined student support, visa tips and much more.</p>
          <button
            onClick={onRent}
            className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300 mb-4"
          >
            Sign Up Now!
          </button>
          <button
            onClick={() => router.push('/marketplace')}
            className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300 mb-6"
          >
            Explore Marketplace!
          </button>
          <Image
            src="/images/y3.svg"
            alt="Early Access Image"
            className="w-full object-cover mb-8 rounded-lg"
            layout="responsive"
            width={2000}
            height={400}
          />
        </div>
      </div>

      <div>
      <h1 className="text-center text-2xl font-bold mb-4">Our Partner Universities</h1>
      <UniversityCarousel logos={logos} />
    </div>
      <div className="flex flex-col gap-4 mt-8">
        <div className="text-center text-2xl font-bold mb-4">Our Services</div>
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          <div className="hidden md:block relative">
            <Carousel
              images={desktopImages}
              interval={7000}
              width="w-full md:w-[500px] lg:w-[1100px]"
              height="h-80 md:h-[200px] lg:h-[650px]"
              links={serviceLinks}
              className="rounded-lg"
            />
          </div>
          <div className="block md:hidden w-full max-w-[1000px] mx-auto">
            <Carousel
              images={mobileImagesFront}
              interval={7000}
              width="w-[26rem]"
              height="h-[32rem]"
              links={serviceLinks}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="relative w-full md:w-3/4 lg:w-1/2">
          <div className="hidden md:block">
            <Carousel
              images={desktopImages1}
              interval={7000}
              width="w-full md:w-[500px] lg:w-[1500px]"
              height="h-80 md:h-[200px] lg:h-[700px]"
              links={serviceLinks1}
              className="rounded-6xl"
            />
          </div>
          <div className="block md:hidden w-full max-w-[1000px] mx-auto">
            <Carousel
              images={mobileImagesFront1}
              interval={7000}
              width="w-[26rem]"
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
        width="w-full md:w-[300px] lg:w-[700px]"
        height="h-80 md:h-[400px] lg:h-[550px]"
        className="rounded-lg"
      />
    </div>
  );
}
