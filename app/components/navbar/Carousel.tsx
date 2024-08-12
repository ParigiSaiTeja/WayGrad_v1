import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface CarouselProps {
  images: string[];
  interval?: number; // Interval in milliseconds
  width?: string;   // Optional width prop for dynamic sizing
  height?: string;  // Optional height prop for dynamic sizing
}

const Carousel = ({ images, interval = 3000, width = '100%', height = '300px' }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${width} ${height}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 flex items-center justify-center ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={image}
            alt={`Carousel image ${index + 1}`}
            layout="fill"
            objectFit="contain"  // Change to contain to avoid cropping
            className="object-center"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
