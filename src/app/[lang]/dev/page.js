import { getCache } from "@/lib/redis";

const getGreetingWithLanguage = async (language) => {

    console.log(language)

    if (language === "enlish") return "world";
    return "monde"; 

};

export default async function Page() {

    const getGreeting = async () => {

        const res = await getCache({
            key: "hello",
            fn: getGreetingWithLanguage,
            params: ["english"],
        });
        
        if (res?.error) return "an error occured";
        return res.result;

    };

    const greeting = await getGreeting();

    return (

        <div className="h-screen bg-red-500 w-full flex items-center justify-center">

            {/* <Button
                title="click"
                size="h-14 w-96"
                onClick={handleClick}
                event={{
                    action: "user signed in test"
                }}
            /> */}

            {greeting || "loading..."}

        </div>

    );

};