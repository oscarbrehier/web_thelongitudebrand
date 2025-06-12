import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { captureException } from "@sentry/nextjs";

export async function POST(request) {

	try {

		if (!process.env.SANITY_REVALIDATE_SECRET) {
			return NextResponse.json({
				message: "Missing environment variable SANITY_REVALIDATE_SECRET"
			}, {
				status: 500
			});
		};

		const { isValidSignature, body } = await parseBody(
			request,
			process.env.SANITY_REVALIDATE_SECRET,
			true
		);

		console.log('📥 Webhook received:', body);

		if (!isValidSignature) {

			return NextResponse.json({
				message: "Invalid signature",
				isValidSignature,
				body
			}, {
				status: 401
			});

		} else if (!Array.isArray(body?.tags) || !body.tags.length) {

			return NextResponse.json({
				message: "Bad request",
				body
			}, {
				status: 400
			});

		};

		
		body.tags.forEach((tag) => {
			console.log(`♻️ Revalidating tag: ${tag}`);
			revalidateTag(tag);
		});

		return NextResponse.json({ body });

	} catch (err) {

		captureException(err);
		return NextResponse.json({
			message: err
		}, {
			status: 500
		});

	}

};