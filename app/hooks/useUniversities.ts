// useUniversities.ts
import { create } from 'zustand';

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

interface UniversityStore {
  getUniversityByValue: (value: string) => University | undefined;
  getUniversityLabel: (value: string) => string;
}

const useUniversities = create<UniversityStore>((set) => ({
  getUniversityByValue: (value: string) => universities.find(university => university.value === value),
  getUniversityLabel: (value: string) => {
    const university = universities.find(university => university.value === value);
    return university ? university.name : 'Unknown University';
  },
}));

export default useUniversities;
