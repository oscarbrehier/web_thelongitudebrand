"use client"
import handleFirebaseError from "@/lib/firebase/handleFirebaseError";
import { useRouter, useSearchParams } from "next/navigation";
import SignInForm from "@/app/components/forms/SignInForm";
import { useCartStore } from "@/lib/stores/useCartStore";
import signIn from "@/lib/authentication/signIn";
import { useState, use } from "react";
import posthog from "posthog-js";
import { trackEvent } from "@/lib/analytics/analytics";
import { signInSchema } from "@/lib/schema";

export default function Page(props) {
    
    const params = use(props.params);

    const setCartSync = useCartStore((state) => state.setSynced);

    const {
        lang
    } = params;

    const query = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("idle");
    const [form, setForm] = useState({
        error: null,
    });
    const [inputErrors, setInputErrors] = useState({
        email: null,
        password: null
    });

    const handleForm = async (event) => {

        event.preventDefault();
        setStatus("loading");

        try {

            trackEvent("sign_in_click", { source: "modal" });

            const formData = new FormData(event.target);
            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            };

            signInSchema.parse(data);
            const { result, user } = await signIn(data.email, data.password, setCartSync);

            if (result) {
                posthog.identify(user.uid, {
                    email: user.email
                });
                setStatus("success");
                router.push("/customer/personal-information");
            }

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setInputErrors(prev => ({
                    ...prev,
                    email: errors.email || null,
                    password: errors.password || null,
                }));

            } else if (error.code) {

                const formatError = handleFirebaseError(error.code);
                setForm(prev => ({ ...prev, error: formatError }));

            } else {
                setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));
            };

            setStatus("error");

        };

    };

    return (

        <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <div className="mx-2 mb-4">

                    <p className="capitalize text-lg">sign in</p>

                </div>

                <SignInForm
                    lang={lang}
                    handleForm={handleForm}
                    errors={{
                        email: inputErrors.email,
                        password: inputErrors.password,
                        form: form.error
                    }}
                    status={status}
                    email={query.get("email") || null}
                />

            </div>


        </div>

    );
};