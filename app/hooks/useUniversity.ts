// Define university types
export interface University {
  name: string;
  value: string;
}

// Static list of universities
const universities: University[] = [
  { name: 'Abilene Christian University', value: 'abilene-christian-university' },
  { name: 'Abraham Baldwin Agricultural College', value: 'abraham-baldwin-agricultural-college' },
  { name: 'Academy of Art University', value: 'academy-of-art-university' },
  { name: 'Acadia University', value: 'acadia-university' },
  { name: 'Adams State University', value: 'adams-state-university' },
  { name: 'Adelphi University', value: 'adelphi-university' },
  { name: 'Adrian College', value: 'adrian-college' },
  { name: 'Adventist University of Health Sciences', value: 'adventist-university-of-health-sciences' },
  { name: 'Agnes Scott College', value: 'agnes-scott-college' },
  { name: 'AIB College of Business', value: 'aib-college-of-business' },
  { name: 'Alabama Agricultural and Mechanical University', value: 'alabama-agricultural-and-mechanical-university' },
  { name: 'Alabama State University', value: 'alabama-state-university' },
  { name: 'Alaska Pacific University', value: 'alaska-pacific-university' },
  { name: 'Albany College of Pharmacy and Health Sciences', value: 'albany-college-of-pharmacy-and-health-sciences' },
  { name: 'Albany State University', value: 'albany-state-university' },
  { name: 'Albertus Magnus College', value: 'albertus-magnus-college' },
  { name: 'Albion College', value: 'albion-college' },
  // Add more universities as needed
];

// Custom hook for managing universities
const useUniversities = () => {
  const getUniversityByValue = (value: string) => {
    return universities.find(university => university.value === value);
  };

  const getUniversityLabel = (value: string) => {
    const university = getUniversityByValue(value);
    return university ? university.name : 'Unknown University';
  };

  return {
    getUniversityByValue,
    getUniversityLabel,
  };
};

export default useUniversities;
