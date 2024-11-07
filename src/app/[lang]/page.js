import { spaceGrotesk } from "@/styles/fonts";

export default function Page({ params: { lang } }) {

	return (

		<div className="h-screen w-full flex items-center justify-center">

			<p className={`uppercase text-2xl font-medium text-neutral-800 ` + spaceGrotesk.className}>soon coming.</p>

		</div>

	);
	
};
