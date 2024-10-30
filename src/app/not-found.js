import Link from "next/link";
import { PageContainer } from "./components/container/PageContainer";
import Button from "./components/ui/Button";
import Hyperlink from "./components/ui/Hyperlink";

export default function NotFound() {

    return (

        <PageContainer>

            <div className="h-screen w-full lg:grid grid-cols-4 gap-2 flex items-center justify-center">

                <div className="col-span-2 col-start-2 lg:w-full md:w-2/3 md:p-0 px-8 h-auto flex flex-col justify-center space-y-4">

                    <div className="w-full flex flex-col space-y-2">

                        <h1 className="lg:w-2/3 text-4xl">Sorry, we couldn't find what you were lookig for</h1>
                        <p className="lg:w-2/3">The page you’re looking for can’t be found. Go back to your previous page or use the search bar to try again.</p>

                    </div>

                    <Hyperlink
                        title="go to homepage"
                        to="/shop"
                        size="h-14 lg:w-2/3"
                    />

                </div>

            </div>

        </PageContainer>



    );

};