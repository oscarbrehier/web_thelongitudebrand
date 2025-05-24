import getOrderDetails from "@/lib/firestore/getOrderDetails";
import { CarrierInfoCard } from "./card-carrier-info";
import { TimelineCard } from "./card-timeline";
import { DeliveryInfoCard } from "./card-delivery-info";
import { ItemsSection } from "./section-items";
import { DownloadReceiptButton } from "./button-download-receipt";
import catchError from "@/lib/catchErrors";
import orderStatus from "@/lib/constants/orderStatus";

export default async function Page(props) {
    const params = await props.params;

    const {
        orderId
    } = params;

    const [error, data] = await catchError(getOrderDetails(orderId));

    if (error) return;

    const { order, orderProcess, checkout } = data;

    return data && (

        <div className="h-auto w-full mt-16 sm:space-y-8 space-y-12">

            <div className="w-full h-auto grid md:grid-cols-2 md:space-y-0 space-y-4">

                <div className="w-full h-auto xs:space-y-0 space-y-2">

                    <div>
                        <p className="text-xs text-neutral-700 capitalize">order ID</p>
                        <p className="md:text-xl text-2xl">#{order.orderId}</p>
                    </div>

                    <p>
                        <span className="text-neutral-700">Ordered on</span>
                        &nbsp;
                        <span>{order.at}</span>
                    </p>

                </div>

                <div className="w-full h-full flex items-center md:justify-end space-y-2">

                    <DownloadReceiptButton />

                </div>

            </div>

            <section className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-2 gap-2">

                <div className="w-full h-56 bg-cream-200 p-4 flex flex-col justify-between">

                    <p className="capitalize font-medium">order total</p>

                    <div className="w-full flex justify-between children:text-sm">

                        <div className="children:capitalize">
                            <p>subtotal</p>
                            <p>tax</p>
                            <p>shipping</p>
                            <p>discount</p>
                        </div>

                        <div className="text-end">
                            <p>{checkout.amount_subtotal / 100}€</p>
                            <p>{checkout.total_details.amount_shipping}€</p>
                            <p>{checkout.total_details.amount_tax}€</p>
                            <p>- {checkout.total_details.amount_discount}€</p>
                        </div>

                    </div>

                    <div className="w-full flex justify-between children:font-medium children:capitalize">
                        <p>total</p>
                        <p>{checkout.amount_total / 100}€</p>
                    </div>

                </div>

                <div className="w-full h-56 bg-cream-200 p-4 flex flex-col space-y-8">

                    <p className="capitalize font-medium">shipping</p>

                    <div className="w-full flex justify-between children:text-sm">

                        <div className="children:capitalize">
                            <p>address:</p>
                        </div>

                        <div className="text-end">
                            <p className="capitalize">andré merlaux</p>
                            <p>54 rue de l'Eglise</p>
                            <p>75015, Paris, FR</p>
                        </div>

                    </div>

                </div>

            </section>

            <section className="h-auto w-full space-y-2">

                <p className="capitalize text-lg font-medium">order status ({orderStatus[order.status].label})</p>

                <div className="h-auto w-full grid lg:grid-cols-3 md:grid-cols-2 gap-2">

                    <TimelineCard data={orderProcess.timeline} />
                    <CarrierInfoCard data={orderProcess.shipment} />
                    <DeliveryInfoCard data={orderProcess.shipment} />

                </div>

            </section>

            <ItemsSection data={order} />

        </div>

    );
};