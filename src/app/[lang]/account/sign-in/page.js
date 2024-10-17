'use client'
import { useEffect, useState } from "react";
import signIn from "@/lib/authentication/signIn";
import { PageContainer } from "@/components/container/page";
import Input from "@/components/ui/Input";

export default function Page() {

    const [form, setForm] = useState({ email: null, password: null });

    const handleFormSubmit = async (event) => {

        event.preventDefault();

        const { result, error } = await signInqp(form.email, form.password);
        if (error) return console.log(error);

        console.log(result);

    };

    return (

        <PageContainer>

            <section className="h-screen w-full flex flex-col">

                <div className="w-full grid grid-cols-6 gap-2 h-auto overflow-hidden">

                    <div className="h-screen col-start-3 col-span-2 space-y-4 w-full flex flex-col items-center justify-center">

                        <div className="w-full">
                            <div className="flex justify-start items-center col-start-2">
                                <div className="bg-neon-green">
                                    <p className="capitalize font-playfair italic font-medium text-6xl">sign in</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">

                            <Input 
                                title='email' 
                                type='email' 
                                onChange={(value) => setForm(prev => ({ ...prev, email: value }))} />

                            <Input 
                                title='password' 
                                type='password' 
                                onChange={(value) => setForm(prev => ({ ...prev, password: value }))} />

                        </div>

                        <div className="w-full space-y-2">

                            <button onClick={handleFormSubmit} className="w-full h-10 bg-black text-white text-sm capitalize">
                                continue
                            </button>

                            <div className="w-full flex justify-between">

                                <p className="text-xs">forgot your password?</p>

                            </div>

                        </div>

                        <div className="w-full flex items-center space-x-4">
                            <div className="w-full h-[1px] bg-black bg-opacity-50"></div>
                            <p className="font-playfair italic capitalize text-lg">or</p>
                            <div className="w-full h-[1px] bg-black bg-opacity-50"></div>
                        </div>

                        <button className="w-full h-10 border-[1px] border-black text-sm capitalize">
                            create new account
                        </button>

                    </div>

                </div>

            </section>

        </PageContainer>

    );

};