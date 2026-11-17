import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Country, State, City } from "@/types/country-state-city";

export const useLocationData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Fetch countries once
  useEffect(() => {
    axios
      .get<Country[]>("/api/countries")
      .then((res) => setCountries(res.data))
      .catch(() => toast.error("Failed to load countries"));
  }, []);

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setStates([]);
    setCities([]);

    fetchStates(country.countryCode);
  };

  const selectState = (state: State) => {
    setSelectedState(state);
    setSelectedCity(null);
    setCities([]);

    if (!selectedCountry) return;

    fetchCities(selectedCountry.countryCode, state.stateCode);
  };

  const selectCity = (city: City) => {
    setSelectedCity(city);
  };

  const fetchStates = (countryCode: string) => {
    axios
      .get<State[]>(`/api/states?countryCode=${countryCode}`)
      .then((res) => setStates(res.data))
      .catch(() => toast.error("Failed to load states"));
  };

  const fetchCities = (countryCode: string, stateCode: string) => {
    axios
      .get<City[]>(
        `/api/cities?countryCode=${countryCode}&stateCode=${stateCode}`,
      )
      .then((res) => setCities(res.data))
      .catch(() => toast.error("Failed to load cities"));
  };

  return {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    selectCountry,
    selectState,
    selectCity,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
  };
};
