"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import * as z from "zod";
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
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useLocationData } from "@/hooks/use-location-data";
import { Loader } from "lucide-react";
import Link from "next/link";

const ContactForm = () => {
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
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
  } = useLocationData();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      country: "",
      state: "",
      city: "",
      query: "",
      consent: true,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  // Set default country from user location
  useEffect(() => {
    if (userCountry && countries.length > 0 && !selectedCountry) {
      const country = countries.find((c) => c.countryCode === userCountry);
      if (country) {
        selectCountry(country);
        form.setValue("country", country.name);
      }
    }
  }, [countries, userCountry, selectedCountry]);

  // Keep form field in sync with selected country
  useEffect(() => {
    if (selectedCountry) {
      form.setValue("country", selectedCountry.name);
    }
  }, [selectedCountry]);

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const response = await axios.post("/api/contact", values);
      if (response.status === 200) {
        form.reset();
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
        toast.success(response.data);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data || error.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-start justify-start bg-white rounded-md transition mb-10">
      <div className="space-y-8 mt-2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isSubmitting}
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone and Country */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PhoneInput
                        country={"in"}
                        value={field.value}
                        onChange={(phone) =>
                          form.setValue("phoneNumber", phone, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        autoFormat
                        enableSearch
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
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={selectedCountry?.countryCode ?? ""}
                        onValueChange={(val) => {
                          const country = countries.find(
                            (c) => c.countryCode === val,
                          );
                          if (country) {
                            selectCountry(country);
                            form.setValue("country", country.name);
                          }
                        }}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedCountry?.name || "Select a country"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country: Country) => (
                            <SelectItem
                              key={country.countryCode}
                              value={country.countryCode}
                            >
                              {country.name}
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

            {/* State and City */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 my-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={selectedState?.stateCode ?? ""}
                        onValueChange={(val) => {
                          const state = states.find((s) => s.stateCode === val);
                          if (state) {
                            selectState(state);
                            form.setValue("state", state.name);
                          }
                        }}
                        disabled={!selectedCountry || isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              selectedState?.name || "Select a state"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state: State) => (
                            <SelectItem
                              key={state.stateCode}
                              value={state.stateCode}
                            >
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={selectedCity?.name ?? ""}
                        onValueChange={(val) => {
                          const city = cities.find((c) => c.name === val);
                          if (city) {
                            selectCity(city);
                            form.setValue("city", city.name);
                          }
                        }}
                        disabled={!selectedState || isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={selectedCity?.name || "Select a city"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city: City) => (
                            <SelectItem key={city.name} value={city.name}>
                              {city.name}
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

            {/* Query Field */}
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        {...field}
                        placeholder="e.g. 'I want to know about the vedique wellness programs.'"
                        className="w-full h-32 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 ">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="mt-4"
                      />
                    </FormControl>
                    <div className="text-sm leading-5">
                      By clicking submit, I agree to the{" "}
                      <Link href="/terms-and-conditions">
                        <span className="underline cursor-pointer">
                          Terms & Conditions
                        </span>{" "}
                      </Link>
                      and{" "}
                      <Link href="/return-and-refund-policy">
                        <span className="underline cursor-pointer">
                          Privacy Policy
                        </span>
                      </Link>
                      , and give my consent to receive updates via SMS/Email.
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end mt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="pt-2 bg-webprimary cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Query"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
