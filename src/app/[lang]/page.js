export default function Home() {

	return (

		<main className="h-screen w-full bg-black relative">

			<div className="h-screen w-full absolute flex flex-col items-center justify-center space-y-4 md:px-0 px-10">

				<img className={`svg-blur md:w-[40rem]`} src="/images/landing/oval.png" alt="" />


				<p className="font-chiquita text-white text-center text-8xl svg-blur neon leading-[3.4rem]">soon coming</p>

			</div>

			<div className='h-screen w-full bg-[url("/images/scan_lines.png")] absolute'></div>


		</main>

	);
}
