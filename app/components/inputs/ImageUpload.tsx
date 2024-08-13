'use client';

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = "e3cebz0n";

interface ImageUploadProps {
  onChange: (value: string[]) => void; // Update to handle multiple images
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback((result: any) => {
    
    const newImage = result.info.secure_url;
    onChange([...value, newImage]); // Add new image to the existing list
  }, [onChange, value]);

  const handleRemove = useCallback((image: string) => {
    onChange(value.filter(img => img !== image)); // Remove image from the list
  }, [onChange, value]);

  return (
    <CldUploadWidget 
      onUpload={handleUpload} 
      uploadPreset={uploadPreset}
      options={{ maxFiles: 10 }} // Adjust max files as needed
    >
      {({ open }) => (
        <div
          onClick={() => open?.()}
          className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          <div className="flex flex-wrap gap-2 mt-4">
            {value.map((img, idx) => (
              <div key={idx} className="relative w-32 h-32">
                <Image
                  src={img}
                  alt={`Uploaded Image ${idx}`}
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
                <button
                  onClick={() => handleRemove(img)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;
