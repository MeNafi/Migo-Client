import { z } from "zod";
  
const phone = z.string().regex(/^01\d{9}$/, "Use a Bangladeshi number like 01712345678");
export const loginSchema = z.object({ email: z.string().email("Enter a valid email"), password: z.string().min(1, "Password is required") });
export const registerSchema = z.object({
  role: z.enum(["PASSENGER", "COMMUTER"]),
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone,
  password: z.string().min(8, "At least 8 characters"),
});
export const searchSchema = z.object({
  from: z.string().min(1), to: z.string().min(1), date: z.string().min(1, "Pick a date"), time: z.string().min(1, "Pick a time"),
  seats: z.number().int().min(1).max(4),
}).refine((v) => v.from !== v.to, { path: ["to"], message: "Pickup and drop-off must differ" });
export const vehicleSchema = z.object({
  type: z.enum(["CAR", "BIKE"]), make: z.string().min(2, "Required"), model: z.string().min(1, "Required"), color: z.string().min(2, "Required"),
  registrationNo: z.string().min(4, "Enter the registration number"),
  year: z.number("Enter a year").int().min(1990, "Too old").max(new Date().getFullYear() + 1, "Invalid year"),
  seats: z.number("Required").int().min(1).max(8),
});
export const routeSchema = z.object({
  from: z.string().min(1), to: z.string().min(1), time: z.string().min(1), back: z.string().min(1),
  seats: z.number("Required").int().min(1).max(6), fee: z.number("Required").min(0).max(2000), vehicleId: z.string().optional(),
}).refine((v) => v.from !== v.to, { path: ["to"], message: "Pickup and drop-off must differ" });
export const nameSchema = z.object({ fullName: z.string().min(2, "Enter your name") });
export const emergencySchema = z.object({ name: z.string().min(2, "Required"), phone });
export const passwordSchema = z.object({ currentPassword: z.string().min(1, "Required"), newPassword: z.string().min(8, "At least 8 characters") });
export const reportSchema = z.object({ targetType: z.enum(["USER", "RIDE"]), targetId: z.string().min(1, "Enter an ID"), reason: z.string().min(3, "Tell us briefly"), details: z.string().optional() });
export const ticketSchema = z.object({ subject: z.string().min(3, "Required"), message: z.string().min(5, "Describe the issue") });
export type Login = z.infer<typeof loginSchema>;

export const savedLocationSchema = z.object({
  label: z.string().min(1, "Pick a label"),
  place: z.string().min(1, "Pick a place"),
});
