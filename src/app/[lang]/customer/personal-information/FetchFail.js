"use client"
import { EmptyState } from "@/app/components/EmptyState";
import Button from "@/app/components/ui/Button"
import { useTranslation } from "@/app/i18n/client";
import { useRouter } from "next/navigation";

export function FetchFail({ lang }) {

	const router = useRouter();
	const { t } = useTranslation(lang, "error");

	return (

		<EmptyState
			title="error"
			description={[
				"failed_fetch_user_info",
				"try_refresh_or_later"
			]}
			trans={t}
		>
			<Button
				size="h-10 px-4"
				onClick={() => router.refresh()}
			>
				{t("retry")}
			</Button>
		</EmptyState>

	);

};