import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import getOrderByCheckoutId from "@/lib/firestore/getOrderByCheckoutId";
import { notFound, redirect } from "next/navigation";
import NoContentLayout from "@/app/components/NoContentLayout";
import { TrackEvent } from "../../../../components/TrackEvent";
import { EmptyState } from "@/app/components/EmptyState";
import Link from "next/link";
import { useTranslation } from "@/app/i18n";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default async function Page(props) {

    const params = await props.params;
    const { lang, id } = params;
    const { t } = await useTranslation(lang, "order");

    const user = await getCurrentUser();
    const order = await getOrderByCheckoutId(id, user?.uid || null);
    if (!order) return notFound();

    const { orderId, total, items, at } = order.data();

    const currentDate = new Date();
    const checkoutDate = new Date(at._seconds * 1000);


    const timeDifference = currentDate - checkoutDate;

    // if (timeDifference > 600000) {

    //     return redirect(user ? `/customer/orders/${orderId}` : "/shop");

    // }

    return (

        <div className="h-screen w-full flex">

            <TrackEvent
                event="order_completed"
                data={{
                    orderId: orderId,
                    orderTotal: total,
                    currency: "EUR",
                    itemCount: items.length,
                    cartItems: items,
                }}
            />

            <EmptyState
                title={"confirmation.success_title"}
                description={["confirmation.success_description_line_1", "confirmation.success_description_line_2"]}
                trans={t}
            >

                <p className="capitalize-first">{t("order_id")} {orderId}</p>

                <Hyperlink
                    to={user ? `/customer/orders/${orderId}` : "/shop"}
                    size="h-10 px-10"
                    text="uppercase"
                >
                    {
                        t(`confirmation.${user ? "view_order_cta" : "continue_exploring_cta"}`)
                    }
                </Hyperlink>

            </EmptyState>

        </div>

    );
};