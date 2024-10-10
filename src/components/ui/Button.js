export default function Button({
    title,
    size,
    border = false,
    ...props
}) {

    return (

        <button 
            className={`
                ${border 
                    ? 'bg-transparent border-[1px] border-black hover:bg-neon-green'
                    : 'bg-black text-white hover:bg-neon-green hover:text-black'
                }
                capitalize text-sm transition-all duration-300 ease-in-out` 
                + ' ' + size
            }
            {...props}
        >
            {title}
        </button>

    );

};