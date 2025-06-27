import SanityImage from "@/app/components/ui/SanityImage";
import { getShopContent } from "@/lib/sanity/getShopContent";
import { Newsletter } from "./Newsletter";
import { BrandName } from "@/app/components/BrandName";
import { origin } from "@/lib/constants/settings.config";

export const metadata = {
	metadataBase: new URL(`${origin}/shop`),
	title: {
		default: "Showroom",
		template: "%s | Longitude Official",
	},
	description: "Shop Longitude on the Official Online Store.",
	authors: [{ name: "Longitude Official" }],
	creator: "Longitude Official",
	publisher: "Longitude Official",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: `${origin}/shop`,
		title: "Showroom - Longitude Official",
		description: "Shop Longitude on the Official Online Store.",
		siteName: 'Longitude Official',
		images: [
			{
				url: `${origin}/seo/og-showroom.jpg`,
				width: 1200,
				height: 630,
				alt: 'Longitude Showroom',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: "Showroom - Longitude Official",
		description: "Shop Longitude on the Official Online Store.",
		creator: '@longitude_store',
		images: [`${origin}/og-showroom.jpg`],
	},
	alternates: {
		canonical: `${origin}/shop`,
		languages: {
			"en-EN": "/en",
			"fr-FR": "/fr"
		}
	}
};


export default async function Page(props) {

	const params = await props.params;
	const { lang } = params;

	const { products } = await getShopContent();

	return (

		<main className="h-screen w-full relative">

			<header className="absolute h-auto top-4 left-4 flex flex-col space-y-1 z-20">
				<h1 className="flex flex-col space-y-1">
					<span className="font-times-roman text-6xl bg-neon-green italic capitalize">showroom </span>
					<span><BrandName fontSize="text-md" /></span>
				</ h1>
			</header>

			<section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll children:snap-center snap-always absolute z-10">
				{
					products.map((product, idx) => (

						<div
							key={idx}
							className="h-screen w-full relative"
						>

							<div className="h-screen w-full absolute p-4 flex justify-end md:items-start items-center">
								<h2 className="font-times-roman italic capitalize text-2xl bg-neon-green md:rotate-0 rotate-90">{product.title}</h2>
							</div>

							<div className="h-screen w-full flex items-center">

								<div className="lg:h-[60vh] h-[70vh] w-full grid lg:grid-cols-3 sm:grid-cols-5">

									<div className="lg:col-start-2 sm:col-start-2 lg:col-span-1 col-span-3 h-full flex">

										<div className="flex-1 w-full flex items-center">
											<SanityImage
												source={product.images[0].asset._ref}
												quality={70}
												alt={product.title}
											/>
										</div>

									</div>

								</div>

							</div>

							{/* <div className="h-screen w-full flex items-center justify-center absolute">

								<div className="relative">

									<div className="relative h-[60vh] w-full">

										<div className="flex-1 w-full flex items-center">
											<SanityImage
												source={product.images[0].asset._ref}
												quality={20}
												alt={product.title}
												objectFit="contain"
											/>
										</div>

									</div>

								</div>


							</div> */}

						</div>

					))
				}

				<Newsletter lang={lang} />

			</section>

		</main>

	);

};