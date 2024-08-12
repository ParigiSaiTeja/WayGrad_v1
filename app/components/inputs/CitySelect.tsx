'use client';

import useCitiesAndStates from '@/app/hooks/useCitiesAndStates';
import Select from 'react-select';

export type CitySelectValue = {
  label: string;
  latlng: number[];
  state: string;
  value: string;
}

interface CitySelectProps {
  value?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({
  value,
  onChange
}) => {
  const { getAll } = useCitiesAndStates();

  return (
    <div>
      <Select
        placeholder="Select City"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">
                {option.state}
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

export default CitySelect;
