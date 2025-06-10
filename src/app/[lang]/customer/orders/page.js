import getOrders from "@/lib/firestore/getOrders";
import { useTranslation } from "@/app/i18n";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { OrdersTable } from "./OrdersTable";
import { EmptyState } from "@/app/components/EmptyState";

export default async function Page(props) {

    const params = await props.params;
    const { lang } = params;

    const { t } = await useTranslation(lang, ["order", "common"]);
    const orders = await getOrders();

    return (
        <>
            {
                orders.length > 0 ? <OrdersTable orders={orders} trans={t} /> : (

                    <EmptyState
                        trans={t}
                        title="no_orders"
                        description="no_orders_description"
                    >
                        <Hyperlink
                            to="/shop"
                            size="h-10 px-8"
                        >
                            {t("shop_now", { ns: "common" })}
                        </Hyperlink>
                    </EmptyState>

                )
            }
        </>
    );

};