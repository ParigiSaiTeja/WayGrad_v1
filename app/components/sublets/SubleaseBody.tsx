'use client';

import React from "react";


interface SubleaseBodyProps {
  
  gender: string,
  roomType: string
}

const SubleaseBody: React.FC<SubleaseBodyProps> = ({ 
 
  gender,
  roomType
 }) => {
  return ( 
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
      
        <div className="flex flex-col">
            <div 
              className="text-lg font-semibold"
            >
              {gender}
            </div>
            <div 
              className="text-neutral-500 font-light"
            >
              {roomType}
            </div>
        </div>
      </div>
    </div>
   );
}
 
export default SubleaseBody;