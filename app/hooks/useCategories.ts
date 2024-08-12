import { FaBed, FaBicycle, FaBook, FaBoxOpen, FaChair, FaCouch, FaLaptop, FaTshirt, FaTv } from 'react-icons/fa';
import { GiBunkBeds, GiCookingPot, GiHomeGarage, GiTable } from 'react-icons/gi';
import { MdAir, MdKitchen } from 'react-icons/md';

// Define category types
export interface Category {
  label: string;
  value: string;
  icon: React.ElementType;
}

// Static list of categories
const categories: Category[] = [
  { label: 'Chair', value: 'chair', icon: FaChair },
  { label: 'Table', value: 'table', icon: GiTable },
  { label: 'Fan', value: 'fan', icon: FaBicycle },
  { label: 'AC', value: 'ac', icon: MdAir },
  { label: 'Bed', value: 'bed', icon: FaBed },
  { label: 'Mattress', value: 'mattress', icon: GiBunkBeds },
  { label: 'TV', value: 'tv', icon: FaTv },
  { label: 'Cycle', value: 'cycle', icon: FaBicycle },
  { label: 'Monitor', value: 'monitor', icon: FaLaptop },
  { label: 'Couch', value: 'couch', icon: FaCouch },
  { label: 'Books', value: 'books', icon: FaBook },
  { label: 'Clothes', value: 'clothes', icon: FaTshirt },
  { label: 'Kitchen Appliances', value: 'kitchen-appliances', icon: MdKitchen },
  { label: 'Cookware', value: 'cookware', icon: GiCookingPot },
  { label: 'Garage Items', value: 'garage-items', icon: GiHomeGarage },
  { label: 'Others', value: 'others', icon: FaBoxOpen },
];

// Custom hook for managing categories
const useCategories = () => {
  const getCategoryByValue = (value: string) => {
    return categories.find(category => category.value === value);
  };

  const getCategoryLabel = (value: string) => {
    const category = getCategoryByValue(value);
    return category ? category.label : 'Unknown Category';
  };

  return {
    getCategoryByValue,
    getCategoryLabel,
  };
};

export default useCategories;
