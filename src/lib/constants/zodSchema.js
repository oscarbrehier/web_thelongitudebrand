import { z } from "zod";
import getPasswordStrength from "../utils/getPasswordStrength";

const requiredError = (fieldName) => `${fieldName} is required`;

export const signUpSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: requiredError("First name") }),
    lastName: z
        .string()
        .min(1, { message: requiredError("Last name") }),
    email: z
        .string()
        .min(1, { message: requiredError("Email") })
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, { message: requiredError("Password") })
        .refine(getPasswordStrength, {
            message: "Password is too weak. Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
        }),
    confirmPassword: z
        .string()
        .min(1, { message: requiredError("Confirm password") }),
    terms: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must accept the terms and conditions"
        })
}).refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: requiredError("Email") })
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, { message: requiredError("Password") })
});

export const newsletterSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: requiredError("First name") }),
    lastName: z
        .string()
        .min(1, { message: requiredError("Last name") }),
    email: z
        .string()
        .min(1, { message: requiredError("Email") })
        .email("Please enter a valid email address"),
    terms: z
        .boolean()
        .refine((val) => val === true, {
            message: "You must accept the terms and conditions"
        }),
});

export const resetPasswordSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required" })
        .email("Please enter a valid email address")
});