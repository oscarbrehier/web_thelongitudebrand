import { PageLayout } from "@/components/PageLayout";

export default function Page() {

    return (

        <div className="h-screen w-full bg-[#4834d4] flex flex-col">

            <div className="h-32 flex items-center justify-between uppercase">
                <div className="flex items-center justify-center w-full">
                    <p className="text-white font-helvetica75 font-bold text-4xl ">shop</p>
                </div>
                <p className="text-white font-helveticablack text-8xl">longitude</p>
                <div className="flex items-center justify-center w-full">
                    <p className="text-white font-helvetica75 font-bold text-4xl ">cart: 0</p>
                </div>
            </div>

            <div className="grid grid-cols-3 flex-1 w-full">

                <div className="h-full flex flex-col px-8">

                    <div className="flex-1 w-full flex items-center">
                        <img src="/images/mockups/tshirt_001.png" alt="" />
                    </div>

                    <div className="h-32 w-full">
                        <p className="uppercase text-white font-helvetica text-2xl">BAD MASK 001</p>
                        <p className="uppercase text-white font-helvetica">180 EUR</p>
                    </div>

                </div>

                <div className="h-full flex flex-col px-8">

                    <div className="flex-1 w-full flex items-center">
                        <img src="/images/mockups/tshirt_001.png" alt="" />
                    </div>

                    <div className="h-32 w-full">
                        <p className="uppercase text-white font-helvetica text-2xl">BAD MASK 001</p>
                        <p className="uppercase text-white font-helvetica">180 EUR</p>
                    </div>

                </div>

                <div className="h-full flex flex-col px-8">

                    <div className="flex-1 w-full flex items-center">
                        <img src="/images/mockups/tshirt_001.png" alt="" />
                    </div>

                    <div className="h-32 w-full">
                        <p className="uppercase text-white font-helvetica text-2xl">BAD MASK 001</p>
                        <p className="uppercase text-white font-helvetica">180 EUR</p>
                    </div>

                </div>

            </div>

        </div>

    ); 

};