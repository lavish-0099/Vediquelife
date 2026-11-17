"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { memberApplicationFormSchema } from "@/schemas";
import { CloudUpload, X } from "lucide-react";
import axios from "axios";
import { useRef, useState } from "react";

const MemberApplicationForm = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof memberApplicationFormSchema>>({
    resolver: zodResolver(memberApplicationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      qualification: "",
      location: "",
      experience: "",
      photo: undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setPhoto(file);
    form.setValue("photo", files, {
      shouldValidate: true,
    });
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    form.setValue("photo", undefined, {
      shouldValidate: true,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (
    values: z.infer<typeof memberApplicationFormSchema>,
  ) => {
    const formData = new FormData();
    if (photo) {
      formData.append("photo", photo);
    }
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photo" && typeof value === "string") {
        formData.append(key, value);
      }
    });
    try {
      const response = await axios.post("/api/team-members", formData);
      if (response.status === 200) {
        form.reset();
        form.setValue("photo", undefined);
        setPhoto(null);

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

  const experienceOptions = [
    ...Array.from({ length: 21 }, (_, i) =>
      i === 0
        ? "No Prior Experience"
        : `${i} ${i === 1 ? "Year" : "Years"} of Experience`,
    ).filter(Boolean),
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={isSubmitting}
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      disabled={isSubmitting}
                      placeholder="Enter your mobile number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Qualification */}
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. MSc. - Food & Nutrition"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter your city or location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Experience Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceOptions.map((exp) => (
                          <SelectItem key={exp} value={exp}>
                            {exp}
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

          {/* Photo Upload - full width */}
          <div>
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => {
                const previewUrl = photo ? URL.createObjectURL(photo) : null;

                return (
                  <FormItem>
                    <FormLabel>Upload Photo</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        {previewUrl ? (
                          <div className="relative w-40 h-40 rounded-md overflow-hidden border border-gray-300 shadow group">
                            <img
                              src={previewUrl}
                              alt="Preview"
                              className="w-full h-full object-cover rounded-md"
                            />

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="absolute top-1 right-1 bg-white text-gray-600 rounded-full p-1 border border-gray-300 hover:bg-red-500 hover:text-white transition z-10"
                              title="Remove"
                            >
                              <X className="w-3 h-3 text-webprimary hover:text-white" />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="photo-upload"
                            className="flex flex-col items-center justify-center gap-2 w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-webprimary transition bg-muted/50"
                          >
                            <CloudUpload className="w-8 h-8 text-gray-500" />
                            <p className="text-sm text-gray-500 text-center">
                              Click to upload an image
                            </p>
                          </label>
                        )}

                        {/* Hidden File Input */}
                        <input
                          id="photo-upload"
                          ref={fileInputRef}
                          type="file"
                          accept="image/png, image/jpeg"
                          disabled={isSubmitting}
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground text-webprimary mt-1">
                      Please upload your professional passport size photo.
                      <br />
                      Max file size 2 MB. Format: JPG & PNG only.
                    </p>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-webprimary hover:bg-webvedique"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default MemberApplicationForm;
