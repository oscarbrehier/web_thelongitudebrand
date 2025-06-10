"use client"
import removeFromWishlist from "@/lib/firestore/wishlist/remove";
import SanityImage from "../ui/SanityImage";
import { IoClose } from "react-icons/io5";
import { useAuthContext } from "@/lib/context/AuthContext";
import { trackEvent } from "@/lib/analytics/analytics";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "../ui/loadingSpinner";

export function VariantWishlist({
	content,
	structuredData
}) {

	const [loading, setLoading] = useState(false);
	const { user } = useAuthContext();
	const router = useRouter();

	const handleRemoveFromWishlist = async () => {

		setLoading(true);
		
		await removeFromWishlist(content._id, user.uid);
		trackEvent("add_to_wishlist", {
			productId: content._id,
			name: content.title
		});
		router.refresh();

		setLoading(false);

	};

	return (
		<>

			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

			<article className="relative">

				<div className="w-full h-[30rem] bg-cream-200 p-4 flex flex-col">

					<div className="flex-1 w-full flex items-center">
						<SanityImage
							source={content.images[0].asset._ref}
							quality={70}
							alt={content.title}
						/>
					</div>

					<div>
						<h3 className="text-xs uppercase">{content.title}</h3>
						<p className="text-xs font-medium">{content.price}€</p>
					</div>

				</div>

				<a className="h-full w-full absolute top-0 left-0" href={`/shop/${content.slug.current}`}></a>

				<div className="size-auto absolute top-4 right-4 flex items-center justify-center text-lg">
					{
						loading ? <LoadingSpinner color="border-e-cream-200" /> : (
							<button onClick={handleRemoveFromWishlist}>
								<IoClose />
							</button>
						)
					}
				</div>

			</article>

		</>
	);

};