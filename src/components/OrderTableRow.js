import Link from "next/link";

export default function OrderTableRow() {

    return (

        <Link
            href={`/customer/orders/205039`}
            className="w-full md:h-10 h-auto bg-cream-200 grid md:grid-cols-4 md:gap-2 children:flex children:items-center children:mx-2 cursor-pointer md:p-0 py-2"
        >

            <div>
                <span className="md:hidden block capitalize text-sm">order ID: &nbsp;</span>
                <p className="md:font-normal font-medium text-base">#205039</p>
            </div>

            <div className="md:hidden block w-full h-2"></div>

            <div>
                <span className="md:hidden block capitalize text-sm">date: &nbsp;</span>
                <p className="text-sm">05/10/2024</p>
            </div>

            <div>
                <span className="md:hidden block capitalize text-sm">total: &nbsp;</span>
                <p className="text-sm">4150€</p>
            </div>

            <div className="md:hidden block mt-1">
                <span className="capitalize text-sm">status: &nbsp;</span>
                <p className="text-sm bg-neon-green capitalize">delivered</p>
            </div>

            <div className="flex justify-between">

                <p className="capitalize bg-neon-green text-sm md:block hidden">delivered</p>

                <p className="text-sm md:block hidden">view</p>

            </div>

        </Link>
    )

}