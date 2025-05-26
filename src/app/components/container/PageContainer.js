import NavigationBar from "../navigation/navbar/NavigationBar";
import Footer from "../navigation/footer";
import ClientModals from "../modals/ClientModals";
import SignOutButton from "@/app/[lang]/customer/button-sign-out";
import SubMenu from "../navigation/SubMenu";

export const PageContainer = ({ children, className, lang }) => {

    const customerPages = ["personal-information", "orders", "wishlist"];

    return (

        <div className="h-auto w-full relative">

            <ClientModals>

                <div className="z-30 min-h-screen w-full top-0 flex flex-col justify-between relative">

                    <header className="z-30 h-auto w-full px-4 fixed top-4 space-y-2">
                        <NavigationBar lang={lang} />

                        {/* <SubMenu
                            baseRoute="/customer"
                            items={customerPages}
                            lang={lang}
                        >

                            <SignOutButton
                                title="sign out"
                                className="text-sm hover:bg-neon-green"
                            />

                        </SubMenu> */}

                    </header>

                    <div className="absolute w-full min-h-screen flex flex-col justify-between px-4 z-20">

                        {children}

                        <footer className="mt-10">
                            <Footer lang={lang} />
                        </footer>
                    </div>

                </div>

            </ClientModals>

        </div>

    );

};