import { adminFirestore } from "@/lib/firebase/admin";
import { getProductById } from "@/lib/sanity/getProduct";
import { StoreItem } from "@/app/components/store/StoreItem";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default async function Page() {

    let data = null;

    const user = await getCurrentUser();
    if (!user) return;

    const ref = adminFirestore.collection("wishlists").doc(user.uid);
    const doc = await ref.get();


    if (doc.exists) {

        data = [];

        const productsId = doc.data().items;
        data = await Promise.all(

            productsId.map(async (productId) => {

                const res = await getProductById(productId);
                return res;

            })

        );

    };


    return (

        <>
            {
                data ? (

                    <div className="mt-16">

                        <h1 className="capitalize mx-2 my-1 text-lg">your wishlist</h1>

                        <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                            {data && data.map((item, index) => (
                                <StoreItem key={index} data={item} />
                            ))}

                        </div>

                    </div>

                ) : (

                    <div className="flex-1 w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                        <div className="col-span-2 col-start-2 flex flex-col items-center justify-center pb-16">
                            <p className="text-3xl">You have no items in your wishlist</p>

                            <Hyperlink
                                title="continue shopping"
                                to="/shop"
                                size="w-2/3 h-10"
                            />

                        </div>

                    </div>

                )
            }
        </>

    );

};