import MessageWithAction from "@/app/components/MessageWithAction";

export function FallbackContent() {

    return (

        <MessageWithAction
            title="Oops something went wrong!"
            text="We couldn't retrieve the details of your order at the moment. Please check your internet connection or try refreshing the page. If the issue persists, contact our support team for assistance."
            linkTitle="go back to orders"
            link="/customer/orders"
        />

    );

};