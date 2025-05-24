import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default async function Page(props) {
    const params = await props.params;

    const {
        lang
    } = params;

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <h1 className="capitalize mx-2 my-1 text-lg">contact us</h1>

                <p className="text-sm mt-4">Customer service support, inquiries related to: prices and currency, order and preorder payment, order status, shipment info, return and exchange.</p>

                <div className="flex flex-col mt-6">

                    <div>
                        <h3 className="capitalize text-sm underline">email</h3>
                        <p className="text-sm">
                            Send us a message below or email &nbsp;
                            <a className="underline" href="mailto:support@longitudebrand.com">support@longitudebrand.com</a>. 
                            We’ll reply within 24 hours. </p>
                    </div>

                </div>

            </div>

        </div>

    );
};