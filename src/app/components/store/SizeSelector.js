export default function SizeSelector({ available, current, label, setSize, style }) {

    return (

        <div className={"space-y-2" + " " + style}>

            <p className={`text-xs capitalize ${label?.error && 'text-red-600'}`}>{label.error ? label.errorMessage : label.text}</p>

            <div className="grid grid-cols-4 gap-2">

                {available.map((item, index) => (
                    <button
                        key={index}
                        onClick={(e) => setSize(item.size)}
                        className={`${current == item.size && 'bg-neon-green text-black'} flex items-center justify-center uppercase text-sm border-[1px] border-neutral-900`}>
                        {item.size}
                    </button>
                ))}


            </div>

        </div>

    );

};