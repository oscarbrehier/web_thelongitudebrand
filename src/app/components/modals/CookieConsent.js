"use client"
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import ModalContainer from "./ModalContainer";
import { IoIosArrowForward } from "react-icons/io";
import Toggle from "../ui/Toggle";
import clsx from "clsx";
import setCookieConsent from "@/actions/setCookieConsent";
import { useModalContext } from "@/lib/context/ModalContext";
import { captureException } from "@sentry/nextjs";
import posthog from "posthog-js";
import { useTranslation } from "@/app/i18n/client";

const cookieCategories = [
	{
		title: "cookie_consent.categories.essential.title",
		description: "cookie_consent.categories.essential.description",
		disabled: true
	},
	// {
	// 	id: "preferences",
	// 	title: "preferences cookies",
	// 	description: "Stores settings like language and currency.",
	// },
	{
		id: "analytics",
		title: "cookie_consent.categories.analytics.title",
		description: "cookie_consent.categories.analytics.description",
	},
];

function getDefaultConsent(acceptAll = true) {
	return Object.fromEntries(
		cookieCategories
			.filter(cat => !cat.disabled && cat.id)
			.map(cat => [cat.id, acceptAll])
	);
};

export default function CookieConsent({
	lang,
}) {

	const { t } = useTranslation(lang, ["privacy"]);  

	const [customizationPanel, setCustomizationPanel] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { activeModal, modalProps: props } = useModalContext();

	if (activeModal != "cookie_consent") return null;

	const submitCookieConsent = async (preferences) => {

		if (isSubmitting) return;

		try {

			setIsSubmitting(true);

			if (preferences?.analytics) {
				posthog.opt_out_capturing();
			}

			await setCookieConsent(preferences);
			window.location.reload();

		} catch (err) {
			captureException(err);
		} finally {
			setIsSubmitting(false);
		}

	};

	return (

		<ModalContainer
			title={t("cookie_consent.modal.title")}
			position="center-center"
			preventClose={props?.preventClose === true}
			size="w-[26rem] h-auto"
		>

			{
				customizationPanel ? <CookiePreferenceCustomization trans={t} onSubmit={(preferences) => submitCookieConsent(preferences)} /> : (

					<div className="space-y-4">

						<p className="text-sm">{t("cookie_consent.modal.description")}</p>

						<div className="space-y-2">
							<div className="w-full flex justify-end text-xs space-x-8 children:underline">
								<button onClick={() => setCustomizationPanel(true)}>{t("cookie_consent.modal.preferences_button")}</button>
								<button onClick={() => submitCookieConsent(getDefaultConsent(false))}>
									{t("cookie_consent.modal.accept_essential_button")}
								</button>
							</div>

							<Button
								size="h-10 w-full"
								onClick={() => submitCookieConsent(getDefaultConsent(true))}
							>
								{t("cookie_consent.modal.accept_all_button")}
							</Button>
						</div>

					</div>

				)
			}

		</ModalContainer>

	)

};

function CookiePreferenceCustomization({ onSubmit, trans }) {

	const [expandedIndex, setExpandedIndex] = useState(null);
	const [cookiePreferences, setCookiePreferences] = useState({});

	useEffect(() => {
		const initialPrefs = {};
		cookieCategories.forEach(cat => {
			if (cat.id) initialPrefs[cat.id] = false;
		});
		setCookiePreferences(initialPrefs);
	}, []);

	const handleToggle = (key, checked) => {
		setCookiePreferences(prev => ({ ...prev, [key]: checked }));
	};

	const handleExpandToggle = (index) => {
		setExpandedIndex(prev => (prev === index ? null : index));
	};

	return (

		<div className="space-y-8">

			<p className="text-sm">{trans("cookie_consent.modal.description")}</p>

			<Button
				onClick={() => onSubmit(getDefaultConsent(true))}
				size="h-10 w-full"
			>
				{trans("cookie_consent.modal.accept_all_button")}
			</Button>

			<div className="space-y-4">

				<p className="capitalize-first">{trans("cookie_consent.modal.settings_title")}</p>

				<div className="h-auto w-full flex flex-col space-y-4 children:text-sm">
					{
						cookieCategories.map((category, i) => {

							return (
								(
									<CookiePreferenceCustomizationRow
										key={i}
										index={i}
										isExpanded={expandedIndex === i}
										onExpandToggle={() => handleExpandToggle(i)}
										trans={trans}
										toggle={category?.disabled
											? <p className="text-sm">{trans("cookie_consent.modal.always_active")}</p>
											: <Toggle
												onChange={(checked) => handleToggle(category.id, checked)} />
										}
										{...category}
									/>
								)
							)

						})
					}
				</div>

			</div>

			<Button
				border
				size="h-10 w-full"
				onClick={() => onSubmit(cookiePreferences)}
			>
				{trans("cookie_consent.modal.confirm_selection_button")}
			</Button>

		</div>

	);

};

function CookiePreferenceCustomizationRow({ title, description, toggle, isExpanded, onExpandToggle, trans }) {

	return (
		<div className="h-auto w-full space-y-2">

			<div className="grid grid-cols-2">

				<p className="uppercase text-sm">{trans(title)}</p>
				<div className="w-full flex justify-end items-center space-x-4">
					{toggle}
					<button onClick={onExpandToggle}>
						<IoIosArrowForward
							className={clsx(
								"transform transition-transform duration-200 ease-in-out",
								isExpanded ? "rotate-90" : "rotate-0"
							)}
						/>
					</button>
				</div>

			</div>

			{/* <div className={`w-full overflow-hidden transition-all duration-300 ${expanded ? "max-h-16" : "h-0"}`} > */}
			<div className={`w-full overflow-hidden ${isExpanded ? "h-auto" : "h-0"}`}>
				<p className="text-sm">{trans(description)}</p>
			</div>

		</div>
	);

};