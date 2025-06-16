import clsx from "clsx";

export function BrandName({
	fontSize = "text-lg",
	animation = false
}) {

	return (
		<p className={fontSize}>
			<span className={animation ? "brand-word" : ""}>the</span>
			<span className={clsx("font-semibold", animation ? "brand-word" : "")}>longitude</span>
			<span className={animation ? "brand-word" : ""}>brand</span>
		</p>
	);

};