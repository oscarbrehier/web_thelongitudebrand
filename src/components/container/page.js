'use client'
import { NavigationBar } from "../navigation/bar";
import Footer from "../footer";

export const PageContainer = ({ children, className }) => {


    return (

        <div className="h-auto w-full z-10">

            <div className={`z-20 px-4` + ' ' + className}>
                {children}

                <div>
                    <Footer />
                </div>

            </div>

            <div className="z-10 h-auto w-full px-4 fixed top-4">
                <NavigationBar />
            </div>

        </div>

    );

};