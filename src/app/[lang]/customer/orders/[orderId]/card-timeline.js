import formatTimestamp from "@/lib/firestore/formatTimestamp";

export function TimelineCard({ data }) {

    return (

        <div className="w-full h-56 space-y-4 bg-cream-200 p-4 lg:col-span-1 sm:col-span-2 overflow-y-scroll">

            <p className="capitalize font-medium">tracking progress</p>

            <div className="flex flex-col space-y-4">

                {data.map((item, index) => (

                    <div key={index} className="children:sm:text-sm children:text-xs">

                        <div className="xs:col-span-3 h-full">
                            <p className="font-medium">{item.title}</p>
                            
                            {
                                item?.message && item.message.split("</br>").map((line, index) => (
                                    <p key={index} className="text-neutral-600">{line}</p>
                                ))
                                
                            }

                            <p className="text-neutral-600">{formatTimestamp(item.at, "MMMM d, yyyy h:mm a")}</p>
                        </div>

                    </div>

                ))}

            </div>
        </div>

    );

};