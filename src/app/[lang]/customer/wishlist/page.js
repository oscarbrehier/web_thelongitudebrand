import { getProductBySlug } from "@/lib/sanity/getProduct";
import { StoreItem } from "@/app/components/store/StoreItem";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import Hyperlink from "@/app/components/ui/Hyperlink";
import { wishlistFetch } from "@/lib/firestore/wishlist";
import catchError from "@/lib/catchErrors";

export default async function Page() {

    let wishlist = null;

    const user = await getCurrentUser();
    if (!user) return;

    const [error, wishlistItems] = await catchError(wishlistFetch(user?.uid));

    if (wishlistItems) {


        wishlist = [];

        wishlist = await Promise.all(

            wishlistItems.map(async (productSlug) => {

                const res = await getProductBySlug(productSlug);
                return res;

            })

        );

    };


    return (

        <>
            {
                wishlist ? (

                    <div className="mt-16">

                        <h1 className="capitalize mx-2 my-1 text-lg">your wishlist</h1>

                        <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                            {wishlist && wishlist.map((item, index) => (
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