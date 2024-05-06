'use client'
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Home() {

	return (

		<main className="h-auto w-full flex flex-col">

			<div className="bg-white h-screen w-full flex flex-col pb-4">

				<Navigation />


			</div>

			<Footer />

		</main>

	);

}
