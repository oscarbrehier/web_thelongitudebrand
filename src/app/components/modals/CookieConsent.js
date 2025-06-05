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

const cookieCategories = [
	{
		title: "essential cookies",
		description: "Required for the website to function properly (e.g., cart, login). These cannot be disabled.",
		disabled: true
	},
	// {
	// 	id: "preferences",
	// 	title: "preferences cookies",
	// 	description: "Stores settings like language and currency.",
	// },
	{
		id: "analytics",
		title: "analytics cookies",
		description: "Helps us understand website usage to improve performance.",
	},
];

function getDefaultConsent(acceptAll = true) {
	return Object.fromEntries(
		cookieCategories
			.filter(cat => !cat.disabled && cat.id)
			.map(cat => [cat.id, acceptAll])
	);
};

export default function CookieConsent() {

	const [customizationPanel, setCustomizationPanel] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { activeModal } = useModalContext();

	if (activeModal != "cookie_consent") return null;

	const submitCookieConsent = async (preferences) => {

		if (isSubmitting) return;

		try {
			setIsSubmitting(true);
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
			title="cookie preferences"
			position="center-center"
			preventClose
			size="w-[26rem] h-auto"
		>

			{
				customizationPanel ? <CookiePreferenceCustomization onSubmit={(preferences) => submitCookieConsent(preferences)} /> : (

					<div className="space-y-4">

						<p className="text-sm">We use cookies to enhance your experience, analyze site usage, and personalize content. You can accept all, reject non-essential, or customize your preferences.</p>

						<div className="space-y-2">
							<div className="w-full flex justify-end text-xs space-x-8 children:underline">
								<button onClick={() => setCustomizationPanel(true)}>cookie preferences</button>
								<button onClick={() => submitCookieConsent(getDefaultConsent(false))}>
									accept essential cookies
								</button>
							</div>

							<Button
								size="h-10 w-full"
								onClick={() => submitCookieConsent(getDefaultConsent(true))}
							>
								accept all
							</Button>
						</div>

					</div>

				)
			}

		</ModalContainer>

	)

};

function CookiePreferenceCustomization({ onSubmit }) {

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

			<p className="text-sm">We use cookies to enhance your experience, analyze site usage, and personalize content. You can accept all, reject non-essential, or customize your preferences.</p>

			<Button
				onClick={() => onSubmit(getDefaultConsent(true))}
				size="h-10 w-full"
			>
				accept all
			</Button>

			<div className="space-y-4">

				<p>Settings</p>

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
										toggle={category?.disabled
											? <p className="text-sm">Always active</p>
											: <Toggle onChange={(checked) => handleToggle(category.id, checked)} />
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
				confirm selection
			</Button>

		</div>

	);

};

function CookiePreferenceCustomizationRow({ title, description, toggle, isExpanded, onExpandToggle }) {

	return (
		<div className="h-auto w-full space-y-2">

			<div className="grid grid-cols-2">

				<p className="uppercase text-sm">{title}</p>
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
				<p className="text-sm">{description}</p>
			</div>

		</div>
	);

};