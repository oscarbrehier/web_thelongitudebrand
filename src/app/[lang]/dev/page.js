"use client"
import { useModalContext } from "@/lib/context/ModalContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";

export default function Page() {

	const router = useRouter();

	function handleOnClick() {
		router.push("/customer/personal-information");

	}
 
	return (

		<div className="h-screen w-full flex items-center justify-center">
			<button onClick={handleOnClick}>click</button>
		</div>

	)

};