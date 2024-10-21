'use client';
import Button from "@/app/components/ui/Button";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default function Page() {

    return (
        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <p className="capitalize mx-2 my-1">your address book</p>

                <div className="w-full h-auto bg-cream-300 p-2 space-y-2">

                    <div className="h-6 w-full flex items-center justify-between children:text-sm">

                        <p className="capitalize">andré merlaux</p>

                        <div className="flex children:capitalize">
                            <button>delete</button>
                        </div>

                    </div>

                    <div className="w-full flex flex-col children:capitalize children:text-sm">

                        <p>+33 0745005251</p>
                        <p>28 boulevard arago</p>
                        <p>paris</p>
                        <p>75013</p>
                        <p>france</p>

                    </div>

                </div>

                <Hyperlink
                    to="/customer/address-book/add"
                    title="add new address"
                    size="h-14 w-full mt-4"
                    // onClick={() => }
                />

            </div>
        </div>
    );
};
