import Link from "next/link"

export default function Hyperlink({
    to,
    title,
    size,
    ...props
}) {

    return (

        <Link 
            className={`
                bg-black text-white 
                hover:bg-neon-green hover:text-black
                flex items-center justify-center
                capitalize mt-4 text-sm transition-all duration-300 ease-in-out` + ' ' + size}
            href={to}
            {...props}
        >
            {title}
        </Link>

    );

};