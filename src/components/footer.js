export default function Footer() {

    return (

        <footer className="h-52 w-full px-4 pb-4">

            <div className="h-full bg-white flex items-center justify-between px-4">

                {/* <div className="h-16 py-4">
                    <img className="h-full" src="/images/nav_logo.svg" alt="" />
                </div> */}

                {/* <div className="h-16 py-4">
                    <img className="h-full" src="/images/nav_logo.svg" alt="" />
                </div> */}

                <div className="flex flex-col items-end justify-center font-helvetica capitalize">
                    <p>my account</p>
                    <p>shipping</p>
                    <p>billing</p>
                    <p>customer service</p>
                    <p>contact us</p>
                </div>

            </div>

        </footer>

    );

};