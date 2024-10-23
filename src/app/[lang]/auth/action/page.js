"use client"
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page({ }) {

    const router = useRouter();

    const params = useSearchParams();
    const mode = params.get("mode");

    if (mode == "resetPassword") {

        const code = params.get('oobCode');
        router.push(`/auth/action/reset-password?code=${code}`);

    }

    return null;

};