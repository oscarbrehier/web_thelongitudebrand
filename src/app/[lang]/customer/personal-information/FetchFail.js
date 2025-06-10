"use client"
import { BrandName } from "@/app/components/BrandName";
import Button from "@/app/components/ui/Button"
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";

export function FetchFail({ lang }) {

	const router = useRouter();
	const { t } = useTranslation(lang, "error");

	return (

		<div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">

			<BrandName />

			<div className="text-center">
				<p>{t("failed_fetch_user_info")}</p>
				<p>{t("try_refresh_or_later")}</p>
			</div>

			<Button
				size="h-10 px-4"
				onClick={() => router.refresh()}
			>
				{t("retry")}
			</Button>

		</div>

	);

};