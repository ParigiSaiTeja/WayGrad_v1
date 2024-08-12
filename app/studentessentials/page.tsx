'use client';

import ListingCardHome from '@/app/components/listings/ListingCardHome'; // Import the ListingCard component
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();

  const listingImages = [
    { src: '/images/medium1.png', url: 'https://medium.com/@kushktp98/your-ultimate-guide-to-clear-f1-visa-process-and-interview-a1dba8d371e8' },
    { src: '/images/WayGrad1.png', url: '/page2' },
    { src: '/images/WayGrad2.png', url: '/page3' },
    { src: '/images/medium1.png', url: 'https://medium.com/@kushktp98/your-ultimate-guide-to-clear-f1-visa-process-and-interview-a1dba8d371e8' },
    { src: '/images/WayGrad1.png', url: '/page2' },
    { src: '/images/WayGrad2.png', url: '/page3' },
    { src: '/images/medium1.png', url: 'https://medium.com/@kushktp98/your-ultimate-guide-to-clear-f1-visa-process-and-interview-a1dba8d371e8' },
    { src: '/images/WayGrad1.png', url: '/page2' },
    { src: '/images/WayGrad2.png', url: '/page3' },
    // Add more items if needed
  ];

  // Limit the number of displayed cards to 6
  const displayedImages = listingImages.slice(0, 6);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4 mt-8 w-full max-w-screen-lg px-4">
        <div className="text-center text-2xl font-bold mb-4">
          Our Blogs
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {displayedImages.map((item, index) => (
            <ListingCardHome
              key={index}
              imageSrc={item.src}
              redirectTo={item.url}
              width="w-full"  // Ensure the width is full to fit the grid column
              height="h-[calc(30vh-50px)]" // Custom height to fit one card
            />
          ))}
        </div>

        {/* Link to load more items */}
        <div className="flex justify-center mt-6">
          <a
            href="/more-blogs" // Redirect to the new API endpoint
            className="text-black hover:underline"
          >
            Click here for more
          </a>
        </div>
      </div>

      {/* Additional single listing card with heading */}
      <div className="flex flex-col items-center mt-8">
        <div className="text-center text-2xl font-bold mb-4">
          Schedule a Call with us!
        </div>
        <ListingCardHome
          imageSrc='/images/calendly1.png' // Replace with desired image src
          redirectTo='/page4' // Replace with desired URL
          width="w-80" // Custom width
          height="h-[calc(40vh-50px)]" // Custom height
        />
      </div>
    </div>
  );
}
