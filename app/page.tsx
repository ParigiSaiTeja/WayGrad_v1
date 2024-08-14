'use client';

import Carousel from '@/app/components/navbar/Carousel';
import Image from 'next/image';
import { useState } from 'react';
import styles from './FlipCard.module.css';
import UniversityCarousel from './components/navbar/UniversityCarousel';

export default function Home() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [mobileFlippedIndex, setMobileFlippedIndex] = useState<number | null>(null);

  const images = ['/images/t1.png', '/images/t2.png'];
  const logos = [
    '/images/u1.png', '/images/u2.jpeg', '/images/u4.png', '/images/u6.png', '/images/u10.png',
    '/images/u12.png', '/images/u12.jpg', '/images/u13.png', '/images/u1.png', '/images/u2.jpeg',
    '/images/u4.png', '/images/u6.png', '/images/u10.png', '/images/u12.png', '/images/u13.png', '/images/u12.jpg'
  ];

  const desktopImagesFront = [
    '/images/f3.svg',
    '/images/d1.svg',
    '/images/d2.svg',
    '/images/d3.svg',
    '/images/d6.svg',
  ];

  const desktopImageBack = [
    '/images/m5.svg',
    '/images/d1.svg',
    '/images/m2.svg',
    '/images/m3.svg',
  ];

  const mobileImagesFront = ['/images/z1.svg', '/images/z2.svg', '/images/z3.svg','/images/z4.svg'];
  const mobileImagesBack = ['/images/m2.svg'];

  const apiUrls = [
    '/everylisting',
    '/subleaseListings',
    'https://api.example.com/3',
    'https://api.example.com/4',
    'https://api.example.com/5',
  ];

  const handleButtonClick = (url: string) => {
    window.open(url, '_blank');
  };

  const handleButtonClick1 = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
     <div className="flex flex-col md:flex-row items-center justify-between mt-8 w-full max-w-screen-xl px-4 md:px-8">
  <div className="flex-1 text-left md:text-left md:pr-8 order-2 md:order-1 flex flex-col items-center md:items-start">
    <h1 className="css-aibffq text-4xl md:text-6xl mb-8 text-center md:text-left">
      Navigate Your Student <br />
      Life with Confidence.
    </h1>

    <p className="text-xl text-gray-700 mb-4 text-left hidden md:block">
      Prepare for Arrival:<br />
      Access WikiGrad for college apps, SOP guidance, and essential tips to make your transition seamless.
    </p>
    <p className="text-xl text-gray-700 mb-4 text-left hidden md:block">
      Settle In and Thrive: <br />
      Explore our Marketplace for deals, access essential tips on WikiGrad, and stay organized with our upcoming Task Dashboard.
    </p>
    <button
      onClick={handleButtonClick1}
      className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300 mb-10"
    >
      Get Started with WayGrad
    </button>

    <p className="text-xl font-bold text-gray-800 mb-4 text-left hidden md:block">
      Join the community shaping the future for international students.
    </p>
  </div>
  <div className="flex-1 md:mt-0 w-full order-1 md:order-2 flex flex-col items-center md:items-start">
    <p  className="css-aibffq text-2xl md:text-6xl mb-8 text-center md:text-left">
    Join the community shaping the future for students.

    </p>
    <Image
      src="/images/f7.svg"
      alt="Descriptive Alt Text"
      className="w-full h-[20vh] object-cover mb-8 
      rounded-lg"
      layout="responsive"
      width={2000000}
      height={400}
    />
  </div>
</div>


      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-center text-2xl font-bold mb-4">Our Partner Universities</h1>
            <UniversityCarousel logos={logos} interval={700} itemHeight={100} />
          </div>
        </div>
        <div className="text-center text-2xl font-bold mb-4">Our Services</div>
        <div className="flex flex-col items-center gap-4">
          {desktopImagesFront.map((src, index) => (
            <div
              key={index}
              className={`${styles.flipcard} ${flippedIndex === index ? styles.flipped : ''}`}
              onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
            >
              <div className={styles.flipcardInner}>
                <div className={`${styles.flipfront} ${styles.svgContainer}`}>
                  <img src={src} alt={`Front Image ${index}`} />
                </div>
                <div className={`${styles.flipback} ${styles.svgContainer}`}>
                  <img src={desktopImageBack[index]} alt={`Back Image ${index}`} />
                  <button
                    className={styles.button}
                    onClick={() => handleButtonClick(apiUrls[index])}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
          {mobileImagesFront.map((src, index) => (
            <div
              key={index}
              className={`${styles.mobileFlipcard} ${mobileFlippedIndex === index ? styles.flipped : ''} md:hidden`}
              onClick={() => setMobileFlippedIndex(mobileFlippedIndex === index ? null : index)}
            >
              <div className={styles.mobileFlipcardInner}>
                <div className={`${styles.flipfront} ${styles.svgContainer}`}>
                  <img src={src} alt={`Mobile Front Image ${index}`} />
                </div>
                <div className={`${styles.flipback} ${styles.svgContainer}`}>
                  <img src={mobileImagesBack[index]} alt={`Mobile Back Image ${index}`} />
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from triggering the flip
                      handleButtonClick(apiUrls[index]);
                    }}
                  >
                    Explore Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center text-2xl font-bold text-gray-800 mt-4">Trusted by Students</div>
      <Carousel
        images={images}
        interval={5000}
        width="w-full md:w-3/4 lg:w-1/2"
        height="h-48 md:h-64 lg:h-80"
      />
    </div>
  );
}
