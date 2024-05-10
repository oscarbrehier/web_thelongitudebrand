export default function Footer() {

    return (

        <footer className="h-auto w-full overflow-hidden">

            <div className="h-auto w-full px-8 py-12 flex flex-col justify-between">

                <div className="h-[1px] w-full bg-primary-blue"></div>

                <div className="flex-1 w-full my-8 flex justify-between">
                    <p className="uppercase text-primary-blue font-helvetica75 text-xl">contact</p>
                    <p className="uppercase text-primary-blue font-helvetica75 text-xl">about us</p>
                    <p className="uppercase text-primary-blue font-helvetica75 text-xl">policies</p>
                </div>

                <div className="h-[1px] w-full bg-primary-blue"></div>

            </div>

            <div className="h-[50vh]">
                {/* <p className="text-white uppercase font-helvetica75 text-[30rem]">longitude</p> */}
                <img src="/images/longitude_handwriting.svg" alt="" />
            </div>

        </footer>

    );

};