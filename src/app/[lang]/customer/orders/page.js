import getOrders from "@/lib/firestore/getOrders";
import { useTranslation } from "@/app/i18n";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { OrdersTable } from "./OrdersTable";

export default async function Page(props) {

    const params = await props.params;
    const { lang } = params;

    const { t } = await useTranslation(lang, ["order", "common"]);
    const orders = await getOrders();

    return (
        <>
            {
                orders.length === 0 ? <NoOrders trans={t} /> : <OrdersTable orders={orders} trans={t} />
            }
        </>
    );

};

function NoOrders({ trans }) {

    return (

        <div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">


            <p className="font-playfair text-5xl italic">{trans("no_orders")}.</p>

            <div className="text-center">
                {trans('no_orders_description').split('\n').map((line, i) => (
                    <span key={i}>
                        {line}
                        <br />
                    </span>
                ))}
            </div>

            <Hyperlink
                to="/shop"
                size="h-10 px-8"
            >
                {trans("shop_now", { ns: "common" })}
            </Hyperlink>

        </div>

    );

};