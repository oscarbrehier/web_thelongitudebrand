import { adminFirestore } from "@/lib/firebase/admin";
import { getProductById } from "@/lib/sanity/product";
import { StoreItem } from "@/app/components/store/StoreItem";
import { getCurrentUser } from "@/lib/authentication/sessionHelpers";
import { useTranslation } from "@/app/i18n";
import Hyperlink from "@/app/components/ui/Hyperlink";

export default async function Page(props) {

    const params = await props.params;
    const { lang } = params;
    const { t } = await useTranslation(lang, ["wishlist", "common", "navigation"]);

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
            {/* <h1 className="capitalize font-playfair text-5xl italic">wishlist</h1> */}
            {
                data.length > 0 ? (

                    <div className="flex-1 w-full mt-16 flex flex-col">
                        <h1 className="capitalize mx-2 my-1 text-lg">{t("wishlist", { ns: "navigation" })}</h1>

                        <div className="h-auto w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2">

                            {data && data.map((item, index) => (
                                <StoreItem key={index} data={item} />
                            ))}

                        </div>
                    </div>

                ) : (

                    <div className="flex-1 w-full flex flex-col items-center justify-center space-y-8">


                        <p className="font-playfair text-5xl italic">{t("no_wishlist_title")}.</p>

                        <div className="text-center">
                            {t('no_wishlist_description').split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </div>

                        <Hyperlink
                            to="/shop"
                            size="h-10 px-8"
                        >
                            {t("shop_now", { ns: "common" })}
                        </Hyperlink>

                    </div>

                )
            }
        </>

    );

};