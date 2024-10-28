import Link from "next/link";
import { PageContainer } from "./components/container/PageContainer";
import Button from "./components/ui/Button";
import Hyperlink from "./components/ui/Hyperlink";

export default function NotFound() {

    return (

        <PageContainer>

            <div className="h-screen w-full grid grid-cols-4 gap-2">

                <div className="col-span-2 col-start-2 w-full h-full flex flex-col items-center justify-center">

                    <div className="space-y-2 w-full flex flex-col items-center justify-center">

                        <p className="text-4xl">Sorry, we couldn't find what you were lookig for</p>
                        <p className="w-2/3 text-center">The page you’re looking for can’t be found. Go back to your previous page or use the search bar to try again.</p>

                    </div>

                    <Hyperlink
                        title="go to homepage"
                        to="/shop"
                        size="w-1/2 h-14"
                    />

                </div>

            </div>

        </PageContainer>



    );

};