import { z } from "zod";

// Indian phone number validation (10 digits starting with 6-9)
const phoneSchema = z.string()
  .transform(val => val.replace(/[\s\-\+]/g, '')) // Remove spaces, dashes, plus
  .refine(val => /^(?:91)?[6-9]\d{9}$/.test(val), {
    message: "Enter valid 10-digit mobile number starting with 6-9"
  });

// Email validation
const emailSchema = z.string()
  .trim()
  .email("Invalid email format")
  .max(255, "Email too long");

// Optional email that allows empty string
const optionalEmailSchema = z.string()
  .trim()
  .transform(val => val === "" ? undefined : val)
  .pipe(z.string().email("Invalid email format").max(255, "Email too long").optional());

// Name validation
const nameSchema = z.string()
  .trim()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[\p{L}\s.'-]+$/u, "Name contains invalid characters");

// URL validation (optional)
const optionalUrlSchema = z.string()
  .trim()
  .transform(val => val === "" ? undefined : val)
  .pipe(z.string().url("Invalid URL format").max(255, "URL too long").optional());

// 12th Learner Registration Schema
export const register12thSchema = z.object({
  fullName: nameSchema,
  email: optionalEmailSchema,
  phone: phoneSchema,
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  school: z.string().max(200, "School name too long").optional(),
  board: z.string().optional(),
  stream: z.string().optional(),
  expectedYear: z.string().optional(),
  preferredCourses: z.string().max(500, "Too long").optional(),
  careerInterests: z.string().max(500, "Too long").optional(),
  preferredLocation: z.string().optional(),
});

// Learner Registration Schema
export const registerLearnerSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: z.string().optional(),
  institution: z.string().max(200, "Institution name too long").optional(),
  degree: z.string().max(100, "Degree name too long").optional(),
  specialization: z.string().max(100, "Specialization too long").optional(),
  graduationYear: z.string().optional(),
  experience: z.string().optional(),
  currentRole: z.string().max(100, "Role name too long").optional(),
  skills: z.string().max(500, "Skills list too long").optional(),
  preferredRole: z.string().max(100, "Role name too long").optional(),
});

// Employer Registration Schema
export const registerEmployerSchema = z.object({
  companyName: z.string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name too long"),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  website: optionalUrlSchema,
  contactName: nameSchema,
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  designation: z.string().max(100, "Designation too long").optional(),
  hiringRoles: z.string().max(500, "Too long").optional(),
  experienceLevel: z.string().optional(),
  locationsHiring: z.string().max(200, "Locations too long").optional(),
  hiringTimeline: z.string().optional(),
});

export type Register12thFormData = z.infer<typeof register12thSchema>;
export type RegisterLearnerFormData = z.infer<typeof registerLearnerSchema>;
export type RegisterEmployerFormData = z.infer<typeof registerEmployerSchema>;
