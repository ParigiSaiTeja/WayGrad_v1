'use client';

import Carousel from '@/app/components/navbar/Carousel';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from './FlipCard.module.css';
import UniversityCarousel from './components/navbar/UniversityCarousel';

export default function Home() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [mobileFlippedIndex, setMobileFlippedIndex] = useState<number | null>(null);

  const images = ['/images/t1.png', '/images/t2.png'];
  const logos = ['/images/u1.png', '/images/u2.jpeg', '/images/u5.png', '/images/u6.png', '/images/u7.png'];

  const desktopImagesFront = [
    '/images/d1.svg',
    '/images/d2.svg',
    '/images/d3.svg',
    '/images/d4.svg',
    '/images/d5.svg',
    '/images/d6.svg',
  ];

  const desktopImageBack = [
    '/images/m5.svg',
    '/images/d1.svg',
    '/images/m2.svg',
    '/images/m3.svg',
    '/images/m4.svg',
  ];

  const mobileImagesFront = [
    '/images/m1.svg',
    '/images/m2.svg',
    '/images/m3.1.svg',
    '/images/m4.svg',
    '/images/m5.svg',
  ];

  const mobileImagesBack = ['/images/p2.svg'];

  const apiUrls = [
    '/everylisting',
    '/subleaseListings',
    'https://api.example.com/3',
    'https://api.example.com/4',
    'https://api.example.com/5',
  ];

  const handleButtonClick = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* New Section: Text and Photo */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-8 w-full max-w-screen-xl">
        <div className="flex-1 text-center md:text-left md:pr-8">
          <h1 className="text-4xl font-bold mb-10">
            Where Are You on<br />
            Your Journey?
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            For Students About to Arrive in the USA:
            &quot;Landing soon? Get prepped with WikiGrad and find
            expert help on your college apps and SOPs. We’ve
            got the info you need to make your transition
            smooth!&quot;
          </p>
          <p className="text-xl text-gray-700 mb-4">
            For Students Already in the USA:
            &quot;Already stateside? Score deals on furniture with
            our Marketplace, and keep up with WikiGrad for
            tips and tricks. Plus, our Task Dashboard is coming
            soon to help you stay on top of everything!&quot;
          </p>
          <button
            onClick={handleButtonClick}
            className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-black-600 transition duration-300"
          >
            Explore WayGrad
          </button>
        </div>
        <div className="flex-1 md:mt-0 w-full">
          <Image
            src="/images/w13.svg"
            alt="Descriptive Alt Text"
            className="w-full h-[70vh] object-cover rounded-lg"
            layout="responsive"
            width={700}
            height={400}
          />
        </div>
      </div>
    
      {/* University Carousel */}
      <div className="flex flex-col items-center w-full mt-8">
        <div className={styles.home__marquee}>
          <h1 className="text-2xl font-bold mb-4">Our Partner Universities</h1>
          <div className={styles.marquee__content}>
            <div className={styles.marquee__inner}>
              <UniversityCarousel
                logos={logos}
                itemHeight={100}
               
              />
            </div>
          </div>
        </div>

        {/* Services Flip Cards */}
        <div id="services-section" className="text-center text-2xl font-bold mb-4">Our Services</div>
        <div className="flex flex-col items-center gap-4">
          {desktopImagesFront.map((src, index) => (
            <div
              key={index}
              className={`${styles.flipcard} ${flippedIndex === index ? styles.flipped : ''}`}
              onClick={() => setFlippedIndex(flippedIndex === index ? null : index)}
            >
              <div className={styles.flipcardInner}>
                <div className={styles.flipfront}>
                  <Image src={src} alt={`Front Image ${index}`} layout="responsive" width={700} height={400} />
                </div>
                <div className={styles.flipback}>
                  <Image src={desktopImageBack[index]} alt={`Back Image ${index}`} layout="responsive" width={700} height={400} />
                  <button
                    className={styles.button}
                    onClick={() => handleExploreClick(apiUrls[index])}
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
                  <Image src={src} alt={`Mobile Front Image ${index}`} layout="responsive" width={700} height={400} />
                </div>
                <div className={styles.flipback}>
                  <Image src={mobileImagesBack[index]} alt={`Mobile Back Image ${index}`} layout="responsive" width={700} height={400} />
                  <button
                    className={styles.button}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click event from triggering the flip
                      handleExploreClick(apiUrls[index]);
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
