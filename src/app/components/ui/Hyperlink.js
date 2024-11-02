import Link from "next/link";

export default function Hyperlink({
    to,
    title,
    size,
    border = false,
    margin = true,
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
                capitalize text-sm transition-all duration-300 ease-in-out ${margin && "mt-4"}` + ' ' + size}
            href={to}
            {...props}
        >
            {title}
        </Link>

    );

};