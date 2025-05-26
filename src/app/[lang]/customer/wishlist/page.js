import { adminFirestore } from "@/lib/firebase/admin";
import { getProductById } from "@/lib/sanity/getProduct";
import { StoreItem } from "@/app/components/store/StoreItem";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Hyperlink from "@/app/components/ui/Hyperlink";
import NoContentLayout from "@/app/components/NoContentLayout";

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

        <div className="flex-1 w-full mt-16 flex flex-col">
            <h1 className="capitalize font-playfair text-5xl italic">wishlist</h1>
            {
                data.length > 0 ? (

                    <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                        {data && data.map((item, index) => (
                            <StoreItem key={index} data={item} />
                        ))}

                    </div>

                ) : (
                    <div className="flex-1 flex flex-col items-center mt-14 text-sm space-y-2">
                        <p>You have no items in your wishlist.</p>
                    </div>
                )
            }
        </div>

    );

};