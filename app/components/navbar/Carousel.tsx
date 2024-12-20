import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CarouselProps {
  images: string[];
  interval?: number; // Interval in milliseconds
  width?: string;   // Optional width prop for dynamic sizing
  height?: string;  // Optional height prop for dynamic sizing
  links?: string[]; // Optional links prop for routing
  className?: string; // Optional className prop for additional styling
}

const Carousel = ({ images, interval = 3000, width = '100%', height = '300px', links, className }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleImageClick = () => {
    if (links && links[currentIndex]) {
      window.open(links[currentIndex], '_blank');
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className={`relative overflow-hidden ${width} ${height} ${className}`}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full ${index === currentIndex ? 'block' : 'hidden'}`}
          onClick={handleImageClick}
        >
          <Image
            src={image}
            alt={`Carousel image ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="
            border-radius: 70px;
            shadow-lg
            border-radius: 20px;
     border: 1px solid #2d9fd9;
     color: #a0d18c;
     width: 250px;
     height: 30px;
     padding-left: 10px;"
            
          />
        </div>
      ))}

      {/* Prev and Next Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            aria-label="Previous"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            aria-label="Next"
          >
            &gt;
          </button>
        </>
      )}

      {/* Pagination Circles */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${
                index === currentIndex ? 'bg-white' : 'bg-transparent'
              }`}
            >
              {index === currentIndex && (
                <div className="w-2 h-2 bg-black rounded-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;