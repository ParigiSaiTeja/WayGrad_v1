'use client';

import useCitiesAndStates from '@/app/hooks/useCitiesAndStates';
import Select from 'react-select';

// Define the expected shape of the country select options
export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

// Define the type for react-select options
export type OptionType = {
  value: string;
  label: string;
  flag: string;
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue | null;
  onChange: (value: CountrySelectValue | null) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCitiesAndStates();

  // Ensure getAll() returns data in the correct format
  const data = getAll();
  
  // Map the data to the format expected by react-select
  const options: OptionType[] = data.map((item: any) => ({
    value: item.value,
    label: item.label,
    flag: item.flag || '', // Provide a default value if flag is missing
    region: item.region || '', // Provide a default value if region is missing
  }));

  // Convert react-select's selected value back to CountrySelectValue
  const handleChange = (selected: OptionType | null) => {
    if (selected) {
      onChange({
        flag: selected.flag,
        label: selected.label,
        latlng: [], // Use a default value or map from your data if available
        region: selected.region,
        value: selected.value,
      });
    } else {
      onChange(null);
    }
  };

  return ( 
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={options}
        value={options.find(option => option.value === value?.value) || null}
        onChange={handleChange}
        formatOptionLabel={(option: OptionType) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6'
          }
        })}
      />
    </div>
  );
}
 
export default CountrySelect;
