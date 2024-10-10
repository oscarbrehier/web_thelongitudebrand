'use client'
import { NavigationBar } from "../navigation/bar";
import Footer from "../navigation/footer";
import SignInModal from "../modals/signIn";
import RegisterModal from "../modals/register";
import NewsletterModal from "../modals/newsletter";
import { useModalContext } from "@/lib/context/ModalContext";

export const PageContainer = ({ children, className }) => {

    const { activeModal } = useModalContext();

    return (

        <div className="h-auto w-full relative">

            <div className={`h-auto w-full absolute z-10 ${activeModal !== null && 'blur-md'}`}>

                <div className={`z-20 px-4` + ' ' + className}>
                    <div className="">
                        {children}
                    </div>

                    <div>
                        <Footer />
                    </div>

                </div>

                <div className="z-10 h-auto w-full px-4 fixed top-4">
                    <NavigationBar />
                </div>

            </div>

            <div className="hidden bg-black h-auto w-96 fixed z-20 top-16 right-4 p-2 space-y-4">

                <div className="w-full flex justify-between">

                    <p className="text-white capitalize font-playfair italic text-3xl">added</p>

                    <button className="px-2 text-white text-2xl">
                        -
                    </button>

                </div>

                <div className="">
                    <p className="text-white text-sm">tank-1</p>

                    <div className="flex justify-between children:text-white children:text-sm">
                        <p>black / s</p>
                        <p>50€</p>
                    </div>
                </div>

                <div className="space-y-2">

                    <button className="h-10 w-full border-[1px] border-white text-white uppercase text-sm">
                        view bag
                    </button>

                    <button className="h-10 w-full bg-white uppercase text-sm">
                        checkout
                    </button>

                </div>

            </div>

            <SignInModal />
            <RegisterModal />
            <NewsletterModal />

        </div>

    );

};