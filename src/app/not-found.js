import Link from "next/link";
import { PageContainer } from "./components/container/PageContainer";
import Button from "./components/ui/Button";
import Hyperlink from "./components/ui/Hyperlink";
import NoContentLayout from "./components/NoContentLayout";

export default function NotFound() {

    return (

        <PageContainer>

            <NoContentLayout
                title="Sorry, we couldn't find what you were looking for"
                text="The page you’re looking for can’t be found. Go back to your previous page or use the search bar to try again."
                linkTitle="go to homepage"
                link="/shop"
            />

        </PageContainer>



    );

};