'use client'
import { useState } from "react";
import { PageContainer } from "@/app/components/container/PageContainer";
import Input from "@/app/components/ui/Input";

export default function Page() {

    const [form, setForm] = useState({ email: null, password: null });

    const handleForm = async (event) => {

        event.preventDefault();

        const { result, error } = await login(form.email, form.password);
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
                                    <p className="capitalize font-playfair italic font-medium text-6xl">sign up</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 w-full">

                            <Input title='first name' type='text' />
                            <Input title='last name' type='text' />
                            <Input title='email' type='email' />
                            <Input title='password' type='password' />
                            <Input title='confirm password' type='password' />

                        </div>

                        <div className="w-full space-y-2">

                            <button className="w-full h-10 bg-black text-white text-sm capitalize">
                                continue
                            </button>

                            <div className="w-full flex justify-between">

                                <p className="text-xs">By selecting continue you confirm that you have read our data protection information.</p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </PageContainer>

    );

};