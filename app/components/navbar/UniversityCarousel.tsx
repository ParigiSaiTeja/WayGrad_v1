'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface UniversityCarouselProps {
  logos: string[];
  interval?: number; // Interval in milliseconds
  itemHeight?: number; // Fixed height for logos
}

const UniversityCarousel = ({ logos, interval = 1000, itemHeight = 100 }: UniversityCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [logos.length, interval]);

  const visibleLogos = [
    ...logos.slice(currentIndex, currentIndex + 200),
    ...logos.slice(0, Math.max(0, currentIndex + 200 - logos.length))
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex w-full">
        <div className="flex w-full">
          {visibleLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-2"
              style={{ height: itemHeight }}
            >
              <Image
                src={logo}
                alt={`University Logo ${index + 1}`}
                width={itemHeight} // Ensuring width is proportional
                height={itemHeight}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UniversityCarousel;
