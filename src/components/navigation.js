'use client'
import { useEffect, useState } from "react";
import { getCartLength } from "@/lib/cart";

export default function Navigation() {

	const [cartLength, setCartLength] = useState(getCartLength());

	useEffect(() => {

		const updateCart = () => {

			setCartLength(getCartLength());

		};

		window.addEventListener('storage_new_item', updateCart);
		return () => removeEventListener('storage_new_item', updateCart);

	}, []);

	return (

		<div className="h-auto w-full flex flex-col">

			<section className="h-28 w-full grid grid-cols-3">

				<nav className="wh-full flex items-center justify-center text-black uppercase font-helvetica75 text-5xl px-8">
					<a href="/shop" className="cursor-pointer">shop</a>
				</nav>

				<div className="h-full flex justify-center">
					<div className="h-full flex items-center py-6">
						<img className="h-full" src="/images/nav_logo.svg" alt="" />
					</div>
				</div>

				{/* <nav className="h-full flex items-center justify-center text-black uppercase font-helvetica75 text-5xl px-8">
					<a href="/shop">longitude</a>
				</nav> */}

				{/* <nav className="w-1/5 h-full flex flex-col items-end text-black uppercase justify-between py-4 px-8 font-helvetica font-bold text-sm">

		<div className="text-end">
			<p>bag: 0</p>
			<p>wishlist</p>
		</div>

		<div>
			<p>login</p>
		</div>

	</nav> */}

				<nav className="h-full flex items-center justify-center text-black uppercase font-helvetica75 text-5xl px-8">
					<a href="/cart" className="ml-10">cart: {cartLength}</a>
				</nav>

			</section>

			{/* <section className="h-10 w-full flex items-center justify-between space-x-4 px-4">

				<div>
					
				</div>

				<div className="space-x-4 children:uppercase children:font-helvetica children:text-sm">
					<button>all</button>
					<button>t-shirt</button>
					<button>tanks</button>
				</div> 

				<nav className="space-x-4">
					<button onClick={() => setSidebar(true)} className="font-helvetica uppercase text-sm" href="">search</button>
					<a className="font-helvetica uppercase text-sm" href="">login</a>
				</nav>

			</section> */}

		</div>

	);

};