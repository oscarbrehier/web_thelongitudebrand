'use client'
import { useState, useEffect } from "react";
import Logo from "@/components/Icons/Logo";

export default function Home() {

	// const [cycleNum, setCycleNum] = useState(0);

	// useEffect(() => {

	// 	const cycle = setInterval(() => {

	// 		setCycleNum((prev) => (prev === 2 ? 0 : prev + 1));

	// 	}, 1000);

	// 	return () => clearInterval(cycle);

	// }, []);

	return (

		<main className="h-screen w-full bg-black relative">

			<div className="h-screen w-full absolute flex flex-col items-center justify-center space-y-4 md:px-0 px-10">

				{/* <Logo className={`w-[40rem] svg-blur ${cycleNum == 0 ? 'block' : 'hidden'}`} />
				<img className={`svg-blur ${cycleNum == 1 ? 'block' : 'hidden'}`} src="/images/landing/oval.png" alt="" />
				<img className={`svg-blur ${cycleNum == 2 ? 'block' : 'hidden'}`} src="/images/landing/paris.png" alt="" /> */}

				<img className={`svg-blur md:w-[40rem]`} src="/images/landing/oval.png" alt="" />


				<p className="font-chiquita text-white text-center text-8xl svg-blur neon leading-[3.4rem]">soon coming</p>

			</div>

			<div className='h-screen w-full bg-[url("/images/scan_lines.png")] absolute'></div>


		</main>

	);
}
