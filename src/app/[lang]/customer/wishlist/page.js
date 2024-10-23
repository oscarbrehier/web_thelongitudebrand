import { adminFirestore } from "@/lib/firebase/firebaseAdmin";
import { getProductById } from "@/lib/sanity/getProduct";
import { StoreItem } from "@/app/components/store/StoreItem";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";

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

        <div className="mt-16">

            <p className="capitalize mx-2 my-1">your wishlist</p>

            <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                {data && data.map((item, index) => (
                    <StoreItem key={index} data={item} />
                ))}

            </div>

        </div>

    );

};