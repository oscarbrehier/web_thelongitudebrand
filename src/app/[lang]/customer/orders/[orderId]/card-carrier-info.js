"use client"
import Button from "@/app/components/ui/Button";

export function CarrierInfoCard({ data }) {

    return (

        <div className="w-full h-56 space-y-4 bg-cream-200 p-4 flex flex-col">

            <p className="capitalize font-medium">carrier information</p>

            <div className="flex-1 flex flex-col items-start justify-between">

                <div>
                    <p className="text-sm">
                        <span className="capitalize">carrier</span>: {data.carrier}
                    </p>


                    <p className="text-sm">
                        <span className="capitalize">tracking number</span>: # {data.trackingNumber}
                    </p>
                </div>

                <Button
                    title="track your order"
                    size="h-10 px-4"
                    border={true}
                />

            </div>

        </div>

    );

};