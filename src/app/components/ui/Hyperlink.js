import Link from "next/link";

export default function Hyperlink({
    to,
    size,
    border = false,
    margin = true,
    text = "capitalize",
    children,
    ...props
}) {

    return (

        <Link
            className={`
                ${border
                    ? 'bg-transparent border-[1px] border-black hover:bg-neon-green'
                    : 'bg-black text-white hover:bg-neon-green hover:text-black'
                }
                flex items-center justify-center
                text-sm transition-all duration-300 ease-in-out ${margin && "mt-4"}` + ' ' + size + ' ' + text}
            href={to}
            {...props}
        >
            {children}
        </Link>

    );

};