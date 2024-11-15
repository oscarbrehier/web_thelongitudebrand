import NavigationBar from "../navigation/navbar/NavigationBar";
import Footer from "../navigation/footer";
import ClientModals from "../modals/ClientModals";

export const PageContainer = ({ children, className, lang }) => {

    return (

        <div className="h-auto w-full relative">

            <ClientModals>
                
                <header className="z-10 h-auto w-full px-4 fixed top-4">
                    <NavigationBar lang={lang} />
                </header>

                <main className={`z-20 px-4 ${className}`}>
                    {children}
                </main>

                <footer className="px-4 mt-10">
                    <Footer lang={lang} />
                </footer>

            </ClientModals>

        </div>

    );

};