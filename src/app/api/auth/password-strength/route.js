import { NextResponse } from "next/server";
import zxcvbn from "zxcvbn";

export async function POST(request) {

	const { password } = await request.json();

	if (!password) {
		return NextResponse.json({
			error: "No password provided.",
		}, {
			status: 400
		});
	};

	const strength = zxcvbn(password);
	return NextResponse.json({
		score: strength
	}, {
		status: 200
	});

};