import * as z from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  confirmPassword: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const userProfileSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z.string().min(10, "Phone number should be at least 10 digits"),
});

export const planSignUpFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
});

export const checkoutSchema = z.object({
  billing_firstName: z.string().min(1, { message: "First Name is required" }),
  billing_lastName: z.string().min(1, { message: "Last Name is required" }),
  billing_email: z.string().email({
    message: "Billing Email is required",
  }),
  billing_phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(13, { message: "Phone number must be maximum 13 characters" })
    .regex(/^\+?\d{10,12}$/, { message: "Invalid phone number" }),
  billing_address: z.string().min(1, { message: "Address is required" }),
  billing_country: z.string().min(1, { message: "Country is required" }),
  billing_city: z.string().min(1, { message: "City is required" }),
  billing_state: z.string().min(1, { message: "State is required" }),
  billing_zip: z.string().min(1, { message: "Zip Code is required" }),
  shipping_firstName: z.string().min(1, { message: "First Name is required" }),
  shipping_lastName: z.string().min(1, { message: "Last Name is required" }),
  shipping_email: z.string().email({
    message: "Email is required",
  }),
  shipping_phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(13, { message: "Phone number must be maximum 13 characters" })
    .regex(/^\+?\d{10,12}$/, { message: "Invalid phone number" }),
  shipping_address: z.string().min(1, { message: "Address is required" }),
  shipping_country: z.string().min(1, { message: "Country is required" }),
  shipping_city: z.string().min(1, { message: "City is required" }),
  shipping_state: z.string().min(1, { message: "State is required" }),
  shipping_zip: z.string().min(1, { message: "Zip Code is required" }),
  code: z.string().optional(),
});

export const billingSchema = z.object({
  billing_firstName: z.string().min(1, { message: "First Name is required" }),
  billing_lastName: z.string().min(1, { message: "Last Name is required" }),
  billing_email: z.string().email({
    message: "Billing Email is required",
  }),
  billing_phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(13, { message: "Phone number must be maximum 13 characters" })
    .regex(/^\+?\d{10,12}$/, { message: "Invalid phone number" }),
  billing_address: z.string().min(1, { message: "Address is required" }),
  billing_country: z.string().min(1, { message: "Country is required" }),
  billing_city: z.string().min(1, { message: "City is required" }),
  billing_state: z.string().min(1, { message: "State is required" }),
  billing_zip: z.string().min(1, { message: "Zip Code is required" }),
  code: z.string().optional(),
});

export const couponSchema = z.object({
  code: z.string().min(1, { message: "Coupon code is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const BaseSchema = z.object({
  phoneNumber: z.string().optional(),
  code: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
});

export const OTPLoginSchema = BaseSchema.extend({
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
  code: z.string().optional(),
});

// Extend schema for two-factor OTP login (code required)
export const TwoFactorSchema = OTPLoginSchema.extend({
  code: z.string().min(6, { message: "Code must be 6 digits" }),
});

// Schema for email and password login
export const EmailLoginSchema = BaseSchema.extend({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  code: z.string().optional(),
});

export const checkoutRegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(13, { message: "Phone number must be maximum 13 characters" })
    .regex(/^\+?\d{10,12}$/, { message: "Invalid phone number" }),
  code: z.string().optional(),
});

export const OTPRegisterSchema = RegisterSchema.extend({
  code: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

export const OTPSchema = z.object({
  code: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits"),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
  country: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  query: z.string().min(1, { message: "Your bio is required" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept Terms & Conditions",
  }),
});
export const commentFormSchema = z.object({
  comment: z.string().min(10).max(500),
});

export const consultationFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({
    message: "Email is required",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(12, { message: "Phone number must be maximum 12 digits" })
    .regex(/^\d{10,12}$/, { message: "Invalid phone number" }),
  bestDay: z.union([z.literal("today"), z.literal("tomorrow")]),
  bestTime: z.string().min(1, { message: "Please select a time" }),
  currentCity: z.string().min(1, { message: "City is required" }),
});

export const concernSchema = z.object({
  healthConcern: z.string().min(1, "Please select a health concern"),
});

export const challengeSchema = z.object({
  challenges: z
    .array(z.string())
    .min(1, "Please select at least one challenge"),
});

export const weightLossJourneySchema = z.object({
  weightLossJourney: z
    .array(z.string())
    .min(1, "Please select at least one option"),
});

export const vediqueDietJourneySchema = z.object({
  vediqueDietJourney: z
    .string()
    .min(1, "Please select when you’d like to begin"),
});

export const motivationSchema = z.object({
  motivatedResults: z.string().min(1, "Please select how motivated you are"),
});

export const consultationSchema = z.object({
  lookingVediqueDietNutritionist: z.boolean(),
});

export const weightSchema = z.object({
  currentWeight: z.coerce.number().min(20, "Enter valid weight"),
  height: z.string().min(1, { message: "Enter valid height" }),
  age: z.string().min(1, { message: "Enter valid age" }),
});

export const timelineSchema = z.object({
  journeyTimeline: z.string().min(1, "Please choose a timeline"),
});

export type ConcernValues = z.infer<typeof concernSchema>;
export type WeightFormValues = z.infer<typeof weightSchema>;
export type ChallengeValues = z.infer<typeof challengeSchema>;
export type WeightLossJourneyValues = z.infer<typeof weightLossJourneySchema>;
export type VediqueDietJourneyValues = z.infer<typeof vediqueDietJourneySchema>;
export type MotivationValues = z.infer<typeof motivationSchema>;
export type ConsultationValues = z.infer<typeof consultationSchema>;
export type TimelineValues = z.infer<typeof timelineSchema>;

export const memberApplicationFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Enter a valid phone number"),
  qualification: z.string().min(2, "Qualification is required"),
  location: z.string().min(2, "Location is required"),
  experience: z.string().min(2, "Experience is required"),
  photo: z
    .custom<FileList | undefined>()
    .refine((files) => files && files.length === 1, {
      message: "Please upload a photo.",
    })
    .refine(
      (files) => {
        const file = files?.[0];
        return file && ["image/jpeg", "image/png"].includes(file.type);
      },
      {
        message: "Only JPG or PNG format allowed.",
      },
    )
    .refine(
      (files) => {
        const file = files?.[0];
        return file && file.size <= 2 * 1024 * 1024;
      },
      {
        message: "Maximum file size is 2MB.",
      },
    ),
});
