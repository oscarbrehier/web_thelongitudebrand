'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import register from "@/lib/authentication/register";
import createUser from "@/lib/sanity/createUser";

export default function Page() {

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const router = useRouter();

    const handleForm = async (event) => {

        event.preventDefault();

        const { result, error } = await register(credentials.email, credentials.password);

        if (error) return console.error(error);
        console.log(result);
 
    };

    return (

        <div>
            <form onSubmit={handleForm}>
                <input onChange={(e) => setCredentials(previous => ({ ...previous, email: e.target.value }))} type="email" placeholder="email" required />
                <input onChange={(e) => setCredentials(previous => ({ ...previous, password: e.target.value }))} type="password" placeholder="password" required />
                <button type="submit">submit</button>
            </form>
        </div>

    );

};