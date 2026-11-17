"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserCountry } from "@/context/user-country-context";
import { useEffect } from "react";
import { City, Country, State } from "@/types/country-state-city";
import { useAIPlanStore } from "@/store/ai-plan-store";
import { useLocationData } from "@/hooks/use-location-data";

interface PlanCheckoutFormProps {
  isSubmitting: boolean;
}

const PlanCheckoutForm = ({ isSubmitting }: PlanCheckoutFormProps) => {
  const { userCountry } = useUserCountry();

  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    selectCountry,
    selectState,
    selectCity,
  } = useLocationData();
  const { control, setValue, getValues } = useFormContext();

  const { setPincode } = useAIPlanStore();

  // Set default country from user location
  useEffect(() => {
    if (userCountry && countries.length > 0 && !selectedCountry) {
      const country = countries.find((c) => c.country_code === userCountry);
      if (country) {
        selectCountry(country);
        setValue("country", country.country_name);
      }
    }
  }, [countries, userCountry, selectedCountry]);

  // Keep form field in sync with selected country
  useEffect(() => {
    if (selectedCountry) {
      setValue("country", selectedCountry.country_name);
    }
  }, [selectedCountry]);

  // Auto select billing country, state, and city based on form values
  useEffect(() => {
    const billingCountry = getValues("country");

    if (countries.length && billingCountry && !selectedCountry) {
      const country = countries.find(
        (c) => c.country_name.toLowerCase() === billingCountry.toLowerCase()
      );
      if (country) selectCountry(country);
    }
  }, [countries, getValues, selectCountry, selectedCountry]);

  useEffect(() => {
    const billingState = getValues("state");
    if (states.length && billingState && !selectedState) {
      const state = states.find(
        (s) => s.region_name.toLowerCase() === billingState.toLowerCase()
      );
      if (state) selectState(state);
    }
  }, [states, getValues, selectState, selectedState]);

  useEffect(() => {
    const billingCity = getValues("city");
    if (cities.length && billingCity && !selectedCity) {
      const city = cities.find(
        (c) => c.city_name.toLowerCase() === billingCity.toLowerCase()
      );
      if (city) selectCity(city);
    }
  }, [cities, getValues, selectCity, selectedCity]);

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white rounded-md  transition mb-10">
      <div className="space-y-8 mt-2 w-full">
        <div className="grid grid-cols-1 gap-4 my-4">
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={getValues("country") || ""}
                    onValueChange={(val) => {
                      const country = countries.find(
                        (c) => c.country_name === val
                      );
                      if (country) {
                        selectCountry(country);
                        setValue("country", country.country_name);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        placeholder={
                          selectedCountry
                            ? selectedCountry?.country_name
                            : "Select a country"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: Country) => (
                        <SelectItem
                          key={country.country_code}
                          value={country.country_name}
                        >
                          {country.country_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 my-4">
          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={getValues("state") || ""}
                    onValueChange={(val) => {
                      const state = states.find((s) => s.region_name === val);
                      if (state) {
                        selectState(state);
                        setValue("state", state.region_name, {
                          shouldValidate: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                    disabled={
                      states.length === 0 || !selectedCountry || isSubmitting
                    }
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        placeholder={
                          selectedState?.region_name || "Select a state"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state: State) => (
                        <SelectItem
                          key={state.region_code}
                          value={state.region_name}
                        >
                          {state.region_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 my-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={getValues("city") || ""}
                    onValueChange={(val) => {
                      const city = cities.find((c) => c.city_name === val);
                      if (city) {
                        selectCity(city);
                        setValue("city", city.city_name, {
                          shouldValidate: true,
                          shouldTouch: true,
                        });
                      }
                    }}
                    disabled={
                      cities.length === 0 || !selectedState || isSubmitting
                    }
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        placeholder={
                          selectedCity
                            ? selectedCity.city_name
                            : "Select a city"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city: City) => (
                        <SelectItem key={city.city_code} value={city.city_name}>
                          {city.city_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Pin Code"
                    {...field}
                    className="w-full h-12 rounded-md"
                    onChange={(e) => {
                      const zipCode = e.target.value;
                      field.onChange(zipCode); // ✅ updates React Hook Form
                      setPincode(zipCode); // ✅ your debounce or fetch
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PlanCheckoutForm;
