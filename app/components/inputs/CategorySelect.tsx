'use client';

import { categories } from "../navbar/Categories"; // Ensure correct import path

interface CategorySelectProps {
  value: string | undefined; // Expect a string or undefined
  onChange: (value: string) => void; // Callback should accept a string
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    onChange(selectedCategory); // Pass selected category as string
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="category" className="text-lg font-semibold">Category</label>
      <select
        id="category"
        value={value || ""}
        onChange={handleCategoryChange}
        className="p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.label} value={category.label}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
