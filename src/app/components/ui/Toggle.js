"use client"

import { useState } from "react"
import { cn } from "@/lib/utils/cn"

export default function Toggle({ 
	defaultChecked = false,
	onChange, 
	disabled = false, 
	size = "md", 
	label, 
	className 
}) {
	
	const [isChecked, setIsChecked] = useState(defaultChecked)

	const handleToggle = () => {
		if (disabled) return
		const newChecked = !isChecked
		setIsChecked(newChecked)
		onChange?.(newChecked)
	}

	const sizeClasses = {
		sm: {
			container: "w-8 h-5",
			thumb: "w-3 h-3",
			translate: "translate-x-4",
		},
		md: {
			container: "w-11 h-6",
			thumb: "w-4 h-4",
			translate: "translate-x-6",
		},
		lg: {
			container: "w-14 h-7",
			thumb: "w-5 h-5",
			translate: "translate-x-8",
		},
	}

	const currentSize = sizeClasses[size]

	return (
		<div className={cn("flex items-center gap-3", className)}>
			{label && (
				<label
					htmlFor="toggle"
					className={cn(
						"text-sm font-medium text-gray-900 cursor-pointer",
						disabled && "text-gray-400 cursor-not-allowed",
					)}
				>
					{label}
				</label>
			)}
			<button
				id="toggle"
				type="button"
				role="switch"
				aria-checked={isChecked}
				aria-label={label || "Toggle switch"}
				disabled={disabled}
				onClick={handleToggle}
				className={cn(
					"relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out",
					currentSize.container,
					isChecked ? "bg-neon-green" : "bg-gray-200",
					disabled && "opacity-50 cursor-not-allowed",
				)}
			>
				<span
					className={cn(
						"inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out",
						currentSize.thumb,
						isChecked ? currentSize.translate : "translate-x-1",
					)}
				/>
			</button>
		</div>
	)
}