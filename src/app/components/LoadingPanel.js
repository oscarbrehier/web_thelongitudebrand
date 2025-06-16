import { BrandName } from "./BrandName";

export default function LoadingPanel() {

    return (

        <div className="flex-1 w-full flex pt-2 pb-4 z-20">

            <div className="flex-1 w-full bg-cream-100 flex items-center justify-center text-lg pb-16">
                <BrandName animation />
            </div>

        </div>

    );

};