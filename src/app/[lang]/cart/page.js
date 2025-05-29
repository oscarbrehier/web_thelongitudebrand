import { Cart } from "./Cart";
import { EmptyCart } from "./EmptyCart";

export default async function Page(props) {

    const params = await props.params;

    const {
        lang
    } = params;

    return (

        <>
            <EmptyCart lang={lang} />
            <Cart lang={lang} />
        </>

    )

};