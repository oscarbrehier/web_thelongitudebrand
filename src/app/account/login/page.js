'use client'
import { useState, useEffect     } from "react";
import { useRouter } from "next/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { PageLayout } from "@/components/PageLayout";
import { useAppContext } from "@/lib/context";
import login from "@/lib/authentication/login";

export default function Page() {

    const [form, setForm] = useState({ email: null, password: null });
    const [windowSize, setWindowSize] = useState({ height: null });
    
    const { height, setHeight } = useAppContext();

    useEffect(() => {

        setWindowSize({ height: window.innerHeight });

    }, []);

    const handleForm = async (event) => {

        event.preventDefault();
        
        const { result, error } = await login(form.email, form.password);
        if (error) return console.log(error);

        console.log(result);

    };

    return (

        <PageLayout>

            <section style={{ height: `${windowSize.height - height}px` }} className="w-full flex flex-col items-center justify-center space-y-8">

                <p className="font-helvetica uppercase">log into your account</p>

                <form onSubmit={handleForm} className="space-y-2 flex flex-col">

                    <input onChange={(e) => setForm(previous => ({ ...previous, email: e.target.value }))} autoComplete="false" className="w-96 bg-neutral-100 p-4 font-helvetica uppercase text-xs outline-none" type="email" placeholder="email address" />
                    <input onChange={(e) => setForm(previous => ({ ...previous, password: e.target.value }))} autoComplete="new-password" className="w-96 bg-neutral-100 p-4 font-helvetica uppercase text-xs outline-none" type="password" placeholder="password" />

                    <button type="submit" className="w-96 bg-neutral-200 p-4 uppercase text-xs"> 
                        log in
                    </button>

                </form>

            </section>

        </PageLayout>

    );

};