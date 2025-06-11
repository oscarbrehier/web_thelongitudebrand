import { Poppins } from "next/font/google";

export const poppins = Poppins({
	display: "swap",
	subsets: ["latin"],
	variable: "--poppins-font",
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});