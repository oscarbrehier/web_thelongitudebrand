import Hyperlink from "./ui/Hyperlink"

export default function NoContentLayout({
    title,
    text,
    linkTitle,
    link,
    height,
    children,
}) {

    if (!height) height = "h-screen";
    
    return (

        <div className={`w-full lg:grid grid-cols-4 gap-2 flex items-center justify-center ${height}`}>

            <div className="col-span-2 col-start-2 lg:w-full md:w-2/3 w-full md:p-0 sm:px-8 flex flex-col justify-center space-y-4">

                <div className="w-full flex flex-col space-y-2">
                    <h1 className="text-4xl">{title}</h1>
                    <p className="lg:w-2/3">{text}</p>
                    {children}
                </div>

                <Hyperlink
                    title={linkTitle}
                    size="h-14 lg:w-2/3"
                    to={link}
                />

            </div>

        </div>

    )

}