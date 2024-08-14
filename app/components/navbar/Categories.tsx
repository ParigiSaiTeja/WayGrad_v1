'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { BsFan } from 'react-icons/bs';
import { FaBed, FaBicycle, FaBook, FaBoxOpen, FaCalendarAlt, FaCar, FaChair, FaCouch, FaLaptop, FaTshirt, FaTv } from 'react-icons/fa';
import { GiBunkBeds, GiClamp, GiCookingPot, GiHomeGarage, GiTable } from 'react-icons/gi'; // Import GiLamp
import { MdAir, MdKitchen } from 'react-icons/md';

import React from 'react';
import CategoryBox from "../CategoryBox";
import Container from '../Container';

// Define CategorySelectProps type
interface CategorySelectProps {
  value: string; // Updated to match the value type
  onChange: (category: string) => void; // Updated to match the value type
}

export const categories = [
  {
    label: 'Chair',
    icon: FaChair,
    description: ''
  },
  {
    label: 'Table',
    icon: GiTable,
    description: ''
  },
  {
    label: 'Fan',
    icon: BsFan,
    description: ''
  },
  {
    label: 'AC',
    icon: MdAir,
    description: ''
  },
  {
    label: 'Bed',
    icon: FaBed,
    description: ''
  },
  {
    label: 'Mattress',
    icon: GiBunkBeds,
    description: ''
  },
  {
    label: 'TV',
    icon: FaTv,
    description: ''
  },
  {
    label: 'Lamp', // Added new category
    icon: GiClamp,
    description: ''
  },
  {
    label: 'Cycle',
    icon: FaBicycle,
    description: ''
  },
  {
    label: 'Monitor',
    icon: FaLaptop,
    description: ''
  },
  {
    label: 'Car',
    icon: FaCar,
    description: ''
  },
  {
    label: 'Couch',
    icon: FaCouch,
    description: ''
  },
  {
    label: 'Books',
    icon: FaBook,
    description: ''
  },
  {
    label: 'Gigs',
    icon: FaCalendarAlt,
    description: ''
  },
  {
    label: 'Clothes',
    icon: FaTshirt,
    description: ''
  },
  {
    label: 'Kitchen Appliances',
    icon: MdKitchen,
    description: ''
  },
  {
    label: 'Cookware',
    icon: GiCookingPot,
    description: ''
  },
  {
    label: 'Garage Items',
    icon: GiHomeGarage,
    description: ''
  },
 
  {
    label: 'Others',
    icon: FaBoxOpen,
    description: ''
  }
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex 
          flex-row 
          items-center 
          justify-between
          overflow-x-auto
        "
      >
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="category" className="text-lg font-semibold">Category</label>
      <select
        id="category"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        {categories.map(category => (
          <option key={category.label} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Categories;
