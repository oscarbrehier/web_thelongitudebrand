import { redirect } from "next/navigation";

export default function Layout({
	children
}) {

	if (process.env.NODE_ENV === "production") {
		redirect("/shop");
		return (null);
	};

	return (children);

};