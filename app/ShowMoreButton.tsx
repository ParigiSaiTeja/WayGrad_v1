"use client"; // Ensure this component is treated as a client-side component

import { useState } from "react";


interface ShowMoreButtonProps {
  items: any[];
  Component: React.ElementType;
  title: string;
}

const ShowMoreButton = ({ items, Component, title }: ShowMoreButtonProps) => {
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(true);
  };

  return (
    <div>
      <div 
        className="
          text-2xl 
          font-bold 
          text-gray-900
          mb-6
        "
      >
        {title}
      </div>
      <div 
        className="
          pt-4
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {(showAll ? items : items.slice(0, 4)).map((item: any) => (
          <Component key={item.id} data={item} />
        ))}
      </div>
      {items.length > 4 && !showAll && (
        <button 
          className="
            mt-4 
            px-4 
            py-2 
            bg-blue-500 
            text-white 
            rounded 
            hover:bg-blue-600
          "
          onClick={handleClick}
        >
          Show All {title}
        </button>
      )}
    </div>
  );
};

export default ShowMoreButton;
