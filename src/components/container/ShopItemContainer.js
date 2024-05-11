import { Logo } from "@/assets/svg/logo";
import { Nav } from "../navigation/nav";
import Footer from "../footer";

export const ShopItemContainer = ({ children }) => {

    return (

        <main className="h-auto w-full">

            <div className="h-auto w-full">

                <div className="h-auto w-full flex flex-col items-center justify-between uppercase relative">

                    <div className="w-full p-0 fixed z-10 block">
                        <Logo className={`fixed pointer-events-none`} color='#4834d4' />
                    </div>

                    <Nav />

                </div>

            </div>

            <div className="relative z-20">
                {children}
            </div>

            <Footer />

        </main>

    );

};