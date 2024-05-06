export function HamburgerMenu({ active }) {

    return (

        <div className={`w-full h-auto bg-neutral-300 border-x-[1px] border-b-[1px] rounded-b border-neutral-200 flex flex-col ${active ? 'block' : 'hidden'}`}>

            <div className="w-full p-2 border-b-[1px] border-neutral-400 border-opacity-50">
                <input className="bg-neutral-400 py-2 px-4 w-full placeholder:text-neutral-600 placeholder:text-sm rounded placeholder:uppercase" type="text" placeholder='Search' />
            </div>

            <div className="p-2 border-b-[1px] border-neutral-400 border-opacity-50">
                <a className="text-sm uppercase font-helvetica" href="">shop</a>
            </div>
            <div className="p-2 border-b-[1px] border-neutral-400 border-opacity-50">
                <a className="text-sm uppercase font-helvetica" href="">women</a>
            </div>
            <div className="p-2 border-neutral-400 border-opacity-50">
                <a className="text-sm uppercase font-helvetica" href="">men</a>
            </div>

        </div>

    );

};