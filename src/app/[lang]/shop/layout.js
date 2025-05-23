const baseUrl = "https://www.longitudebrand.com";

export const metadata = {
	metadataBase: new URL(`${baseUrl}/shop`),
	title: {
		default: "Shop",
		template: "%s | Longitude Official",
	},
	description: "Shop Longitude Clothing on the Official Online Store.",
	alternates: {
		canonical: `${baseUrl}/shop`,
		languages: {
			"en-EN": "/en",
			"fr-FR": "/fr"
		}
	}
};

export default function RootLayout({ children }) {

	return (

		<>{children}</>

	);

};
