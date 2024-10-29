import Link from "next/link";
import { PageContainer } from "../components/container/PageContainer";
import Button from "../components/ui/Button";

export default function Page({ params: { lang } }) {

	return (

		<PageContainer lang={lang}>

			{/* <main className="h-screen w-full p-4"> */}
			<main className="h-screen w-full md:pt-[4.5rem] pt-[6.5rem] pb-4">

				<div className="size-full flex flex-col items-center justify-center bg-neon-green space-y-8">

					<div className="h-auto w-auto md:p-0 sm:px-8 px-4">

						<img className={`svg-blur-white md:w-[40rem]`} src="/images/landing/oval-white.png" alt="" />

					</div>
					
					<Link href="/shop" className="uppercase md:text-2xl text-xl font-medium font-space text-neutral-800">
						shop now
					</Link>

				</div>

			</main>

		</PageContainer>

	);
}
