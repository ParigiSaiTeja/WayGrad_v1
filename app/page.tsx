'use client';

import Carousel from '@/app/components/navbar/Carousel';
import React, { useState } from 'react';
import styles from './FlipCard.module.css';
import UniversityCarousel from './components/navbar/UniversityCarousel';

export default function Home() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [mobileFlippedIndex, setMobileFlippedIndex] = useState<number | null>(null);

  const images = ['/images/t1.png', '/images/t2.png'];
  const logos = ['/images/u1.png', '/images/u2.jpeg', '/images/u4.png', '/images/u5.png', '/images/u6.png', '/images/u7.png'];

  const desktopImagesFront = [
    '/images/s1.svg',
    '/images/s2.svg',
    '/images/s3.svg',
    '/images/s4.svg',
    '/images/s6.svg',
  ];

  const desktopImageBack = [
    '/images/s6.svg',
    '/images/s4.svg',
    '/images/s3.svg',
    '/images/s4.svg',
    '/images/s1.svg',
  ];

  const mobileImagesFront = ['/images/p1.svg'];
  const mobileImagesBack = ['/images/p2.svg'];

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

  return (
    <div className="flex flex-col items-center gap-4">
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
                <div className={styles.flipfront}>
                  <img src={src} alt={`Front Image ${index}`} />
                </div>
                <div className={styles.flipback}>
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
              <div className={styles.flipcardInner}>
                <div className={styles.flipfront}>
                  <img src={src} alt={`Mobile Front Image ${index}`} />
                </div>
                <div className={styles.flipback}>
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
