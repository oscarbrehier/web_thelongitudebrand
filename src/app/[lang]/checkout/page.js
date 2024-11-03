"use client"
import CartView from "@/app/components/CartView";
import Button from "@/app/components/ui/Button";
import SignInForm from "@/app/components/forms/SignInForm";
import SignUpForm from "@/app/components/forms/SignUpForm";
import { useState } from "react";

export default function Page({
    params: {
        lang
    }
}) {

    const [activeForm, setActiveForm] = useState("sign_in");

    const handleActions = (event, action) => {

        event.preventDefault();

        if (action == "sign_in" || action == "sign_up") setActiveForm(action);

    };

    return (

        <div className="min-h-screen w-full pt-16 flex flex-col">

            <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

                <div className="2lg:col-start-2 2lg:col-span-1 col-start-1 col-span-2 h-auto">

                    <h1 className="capitalize mx-2 my-1 text-lg">checkout</h1>

                    <p className="text-sm mt-4">To complete your purchase, please sign in or continue as a guest. Next, you'll be taken to our secure Stripe payment page.</p>

                    <div className="w-full flex flex-col space-y-6 mt-6">

                        {
                            activeForm == "sign_in" && <SignInForm
                                lang={lang}
                                handleActions={(e, a) => handleActions(e, a)}
                            />
                        }

                        {
                            activeForm == "sign_up" && <SignUpForm
                                lang={lang}
                                handleActions={(e, a) => handleActions(e, a)}
                            />
                        }

                        <div className="flex items-center space-x-2">

                            <div className="w-full h-[1px] bg-cream-400"></div>
                            <p className="uppercase text-sm">or</p>
                            <div className="w-full h-[1px] bg-cream-400"></div>

                        </div>

                        <div className="space-y-4">

                            <Button
                                title="continue as guest"
                                size="h-14 w-full"
                                border
                            />

                        </div>

                    </div>

                </div>

                <div className="w-full">
                    <CartView
                        lang={lang}
                    />
                </div>

            </div>

        </div>


    );

};