import usCitiesAndStates from "../data/usCitiesAndStates";

const formattedCitiesAndStates = usCitiesAndStates.map((location) => ({
  value: `${location.city}, ${location.state}`,
  label: `${location.city}, ${location.state}`,
  latlng: location.latlng,
  state: location.state,
}));

const useCitiesAndStates = () => {
  const getAll = () => formattedCitiesAndStates;

  const getByValue = (value: string) => {
    return formattedCitiesAndStates.find((item) => item.value === value);
  }

  return {
    getAll,
    getByValue
  }
};

export default useCitiesAndStates;
