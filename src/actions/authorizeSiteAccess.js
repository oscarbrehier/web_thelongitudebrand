"use server"
import { storageKeys } from "@/lib/constants/settings.config";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function authorizeSiteAccess(password) {

	if (password === process.env.SITE_PASSWORD) {

		const cookieStore = await cookies();

		const cookieOptions = {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24,
		};

		console.log(process.env.SITE_SECRET)
		
		const token = jwt.sign({ access: "granted" }, process.env.SITE_SECRET, { expiresIn: "1d" });
		console.log("===", token, "===")

		cookieStore.set(storageKeys.SITE_AUTH, token, cookieOptions);

	} else {

		throw new Error("invalid-password");

	}

};