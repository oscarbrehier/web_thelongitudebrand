export function ProductGrid({ children }) {
	return (
		<div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">
			{children}
		</div>
	);
};