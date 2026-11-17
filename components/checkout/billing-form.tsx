"use client";

import { useFormContext } from "react-hook-form";

import { useEffect } from "react";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocationData } from "@/hooks/use-location-data";
import { City, Country, State } from "@/types/country-state-city";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useUserCountry } from "@/context/user-country-context";

interface BillingFormProps {
  isSubmitting: boolean;
}

const BillingForm = ({ isSubmitting }: BillingFormProps) => {
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
  const { control, setValue, trigger, getValues } = useFormContext();
  // Set default country from user location
  useEffect(() => {
    if (userCountry && countries.length > 0 && !selectedCountry) {
      const country = countries.find((c) => c.countryCode === userCountry);
      if (country) {
        selectCountry(country);
        setValue("billing_country", country.name);
      }
    }
  }, [countries, userCountry, selectedCountry]);

  // Keep form field in sync with selected country
  useEffect(() => {
    if (selectedCountry) {
      setValue("billing_country", selectedCountry.name);
    }
  }, [selectedCountry]);

  // Auto select billing country, state, and city based on form values
  useEffect(() => {
    const billingCountry = getValues("billing_country");

    if (countries.length && billingCountry && !selectedCountry) {
      const country = countries.find(
        (c) => c.name.toLowerCase() === billingCountry.toLowerCase(),
      );
      if (country) selectCountry(country);
    }
  }, [countries, getValues, selectCountry, selectedCountry]);

  useEffect(() => {
    const billingState = getValues("billing_state");
    if (states.length && billingState && !selectedState) {
      const state = states.find(
        (s) => s.name.toLowerCase() === billingState.toLowerCase(),
      );
      if (state) selectState(state);
    }
  }, [states, getValues, selectState, selectedState]);

  useEffect(() => {
    const billingCity = getValues("billing_city");
    if (cities.length && billingCity && !selectedCity) {
      const city = cities.find(
        (c) => c.name.toLowerCase() === billingCity.toLowerCase(),
      );
      if (city) selectCity(city);
    }
  }, [cities, getValues, selectCity, selectedCity]);

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white rounded-md p-4 shadow-sm transition mb-10">
      <h1 className="text-2xl font-bold">Billing Address</h1>
      <div className="space-y-8 mt-8 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="billing_firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="First Name"
                    {...field}
                    className="w-full h-12 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Last Name"
                    {...field}
                    className="w-full h-12 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Email"
                    {...field}
                    className="w-full h-12 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_phoneNumber"
            render={({ field }) => {
              const { trigger, getValues } = useFormContext();

              useEffect(() => {
                const phone = getValues("billing_phoneNumber");
                if (phone) {
                  trigger("billing_phoneNumber");
                }
              }, [trigger, getValues]);

              return (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      country={"in"}
                      value={field.value || ""}
                      onChange={(phone) => {
                        field.onChange(phone);
                      }}
                      autoFormat
                      enableSearch={true}
                      disabled={isSubmitting}
                      countryCodeEditable={false}
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        border: "1px solid #e2e8f0",
                        paddingLeft: "40px",
                        boxSizing: "border-box",
                      }}
                      searchStyle={{
                        width: "90%",
                        height: "40px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={control}
            name="billing_address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    {...field}
                    placeholder="e.g. 'House number, street name'"
                    className="w-full h-32 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name="billing_country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    key={selectedCountry?.countryCode}
                    value={getValues("billing_country") || ""}
                    onValueChange={(val) => {
                      const country = countries.find((c) => c.name === val);
                      if (country) {
                        selectCountry(country);
                        setValue("billing_country", country.name);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full h-12">
                      <SelectValue
                        placeholder={
                          selectedCountry
                            ? selectedCountry?.name
                            : "Select a country"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country: Country) => {
                        return (
                          <SelectItem
                            key={country.countryCode}
                            value={country.name}
                          >
                            {country.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_state"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={getValues("billing_state") || ""}
                    onValueChange={(val) => {
                      const state = states.find((s) => s.name === val);
                      if (state) {
                        selectState(state);
                        setValue("billing_state", state.name, {
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
                        //placeholder="Select a state"
                        placeholder={
                          selectedState
                            ? selectedState?.stateCode
                            : "Select a state"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state: State) => {
                        return (
                          <SelectItem key={state.stateCode} value={state.name}>
                            {state.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={getValues("billing_city") || ""}
                    onValueChange={(val) => {
                      const city = cities.find((c) => c.name === val);
                      if (city) {
                        selectCity(city);
                        setValue("billing_city", city.name, {
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
                          selectedCity ? selectedCity.name : "Select a city"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city: City) => {
                        return (
                          <SelectItem key={city.name} value={city.name}>
                            {city.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billing_zip"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="Zip"
                    {...field}
                    className="w-full h-12 rounded-md"
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

export default BillingForm;
