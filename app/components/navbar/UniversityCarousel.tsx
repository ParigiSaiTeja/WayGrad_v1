
import React from 'react';

const UniversityCarousel: React.FC<{ logos: string[] }> = ({ logos }) => {
  return (
    <div className="overflow-hidden w-full py-8 bg-gray-100 bg-white">
      <div
        className="flex gap-4 animate-scroll"
        style={{
          animation: 'scroll 30s linear infinite',
          whiteSpace: 'nowrap',
        }}
      >
        {logos.concat(logos).map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`University logo ${index}`}
            className="h-8 w-auto object-contain"
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default UniversityCarousel;
