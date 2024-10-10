"use client"
import InputWithLabel from "@/components/ui/InputWithLabel";
import secureSignIn from "@/lib/authentication/secureSignIn";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = async () => {

        const { error } = await secureSignIn(formValues);
        
        if (error) {
            return console.error(error);
        };

        router.push('/shop');        

    };

    return (

        <div className="h-screen w-full bg-black 2md:grid grid-cols-4 gap-2 p-2">

            <div className="h-full col-span-2 col-start-2 flex flex-col justify-center space-y-2">

                <InputWithLabel
                    title='email'
                    type='email'
                    value={formValues.email}
                    onChange={(e) => setFormValues(prev => ({ ...prev, email: e.target.value }))}
                    autoComplete='none'
                />

                <InputWithLabel
                    title='password'
                    type='password'
                    value={formValues.password}
                    onChange={(e) => setFormValues(prev => ({ ...prev, password: e.target.value }))}
                    autoComplete='none'
                />

                <button
                    onClick={handleSubmit}
                    className="
                        h-14 w-full capitalize bg-neon-green 
                        hover:bg-transparent hover:border-[1px] hover:border-neon-green hover:text-white
                        transition-all duration-300 ease-in-out
                ">
                    enter
                </button>

            </div>

        </div>

    );

};