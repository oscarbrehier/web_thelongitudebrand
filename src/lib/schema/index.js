import { z } from "zod";
import getPasswordStrength from "../utils/getPasswordStrength";

export const signUpSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: "field_required" }),
	lastName: z
		.string()
		.min(1, { message: "field_required" }),
	email: z
		.string()
		.min(1, { message: "field_required" })
		.email("invalid_email"),
	password: z
		.string()
		.min(1, { message: "field_required" })
		.refine(async (val) => await getPasswordStrength(val), {
			message: "password_too_weak"
		}),
	confirmPassword: z
		.string()
		.min(1, { message: "field_required" }),
	terms: z
		.boolean()
		.refine((val) => val === true, {
			message: "terms_required"
		})
}).refine((data) => data.password == data.confirmPassword, {
	message: "passwords_do_not_match",
	path: ["confirmPassword"]
});

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, { message: "field_required" })
		.email("invalid_email"),
	password: z
		.string()
		.min(1, { message: "field_required" })
});

export const newsletterSchema = z.object({
	firstName: z
		.string()
		.min(1, { message: "field_required" }),
	lastName: z
		.string()
		.min(1, { message: "field_required" }),
	email: z
		.string()
		.min(1, { message: "field_required" })
		.email("invalid_email"),
	terms: z
		.boolean()
		.refine((val) => val === true, {
			message: "terms_required"
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
		.min(1, { message: "field_required" })
		.email("invalid_email")
});