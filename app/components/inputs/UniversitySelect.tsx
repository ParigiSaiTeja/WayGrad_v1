// UniversitySelect.tsx
import React from 'react';

// Define university types and static list
interface University {
  name: string;
  value: string;
}

const universities: University[] = [
  { name: 'Abilene Christian University', value: 'abilene-christian-university' },
  { name: 'Abraham Baldwin Agricultural College', value: 'abraham-baldwin-agricultural-college' },
  { name: 'Academy of Art University', value: 'academy-of-art-university' },
  // Add more universities as needed
];

interface UniversitySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const UniversitySelect: React.FC<UniversitySelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded"
    >
      <option value="">Select a university</option>
      {universities.map((university) => (
        <option key={university.value} value={university.value}>
          {university.name}
        </option>
      ))}
    </select>
  );
}

export default UniversitySelect;
