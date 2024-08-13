import React, { useEffect, useState } from 'react';

interface University {
  name: string;
  value: string;
}

interface UniversitySelectProps {
  value?: string;
  onChange: (value: string) => void;
}

const UniversitySelect: React.FC<UniversitySelectProps> = ({ value, onChange }) => {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('/universitylist.txt');
        const text = await response.text();
        const universityList = text.split('\n').map(line => line.trim()).filter(line => line);
        const universityOptions = universityList.map(uni => ({ name: uni, value: uni }));
        setUniversities(universityOptions);
      } catch (error) {
        console.error('Failed to load universities', error);
      }
    };

    fetchUniversities();
  }, []);

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
