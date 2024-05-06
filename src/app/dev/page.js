import { PageLayout } from "@/components/PageLayout";

export default function Page() {

    return (

        <PageLayout>
            <div className="h-auto w-full">

                <section className="h-auto w-full grid grid-cols-3">

                    <a href='/shop' className="auto w-full flex flex-col">
                        <div className="h-[75vh] w-full bg-neutral-200 flex items-center justify-center p-8">
                            {/* <img src="/images/mockups/tshirt_001.png" alt="" /> */}
                        </div>
                        <div className="bg-white h-20 w-full p-4">

                            <p className="uppercase font-helvetica text-sm">item title</p>
                            <p className="font-helvetica text-xs">000 EUR</p>

                        </div>
                    </a>

                    <div className="h-[30rem] w-full"></div>
                    <div className="h-[30rem] w-full"></div>

                    <div className="auto w-full flex flex-col">
                        <div className="h-[30rem] w-full bg-neutral-200">

                        </div>
                        <div className="bg-white h-20 w-full">

                        </div>
                    </div>

                </section>

            </div>
        </PageLayout>

    );

};