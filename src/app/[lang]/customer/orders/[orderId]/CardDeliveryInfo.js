import { IoCalendarSharp } from "react-icons/io5";

export function DeliveryInfoCard({ data }) {

    return (

        <div className="w-full h-56 bg-cream-200 p-4 flex flex-col justify-between">

            <IoCalendarSharp className="fill-neutral-800 text-xl" />

            <div className="children:capitalize">
                <p className="text-sm text-neutral-600">estimated delivery date</p>
                <p className="font-medium">{data.estimatedDeliveryDate}</p>
            </div>

        </div>

    );

};