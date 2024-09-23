export default function Home() {
	return (
		// <main className="h-screen w-full flex items-center justify-center space-x-8 p-8">
		// 	<img className="h-2/3" src="/images/shape.svg" alt="" />
		// 	<img className="h-2/3" src="/images/shape.svg" alt="" />



		<main className="h-screen w-full relative overflow-hidden">

			<div className="h-screen w-full absolute flex flex-col items-center justify-center ">
				<img className="sm:h-1/3 h-2/3 w-full" src="/images/landing/soon.svg" alt="" />
				<img className="sm:h-2/3 h-1/3 w-full" src="/images/landing/coming.svg" alt="" />
			</div>

			<div className="h-screen w-full absolute grid grid-cols-4 grid-rows-2">
				<div className="sm:col-start-3 col-start-2 col-span-2 flex items-end">
					<img className="sm:h-1/3 h-2/3 rotate-12" src="/images/landing/sticker.svg" alt="" />
				</div>
			</div>

			{/* <img className="h-96" src="/images/landing/soon.png" alt="" />
			<img className="h-96" src="/images/landing/coming.png" alt="" /> */}
		</main>
	);
}
