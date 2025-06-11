"use client"

import Button from "@/app/components/ui/Button";
import { revalidateTag } from "next/cache";
import { useRouter } from "next/navigation";

export function RetryFetchButton() {

	const router = useRouter();

	const handleClick = () => {
		revalidateTag("products");
		revalidateTag("categories");
		router.refresh();
	};

	return (

		<Button
			size="h-10 px-4"
			onClick={handleClick}
		>
			Retry
		</Button>

	);

};