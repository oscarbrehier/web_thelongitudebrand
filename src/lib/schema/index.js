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
		.refine(async (val) => await getPasswordStrength(val), {
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

export const updatePasswordSchema = z.object({
	currentPassword: z.string().min(1, { message: "field_required" }),
	newPassword: z.string()
		.refine(async (val) => await getPasswordStrength(val), {
			message: "password_too_weak"
		}),
	confirmNewPassword: z.string()
		.min(1, { message: "password_confirm" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
	message: "passwords_do_not_match",
	path: ["confirmNewPassword"]
}).refine((data) => data.currentPassword !== data.newPassword, {
	message: "password_same_as_old",
	path: ["newPassword"]
});


export const resetPasswordSchema = z.object({
	email: z.string()
		.min(1, { message: "Email is required" })
		.email("Please enter a valid email address")
});