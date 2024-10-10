'use client';
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";


export default function Select({
    title,
    options,
    defaultValue,
}) {

    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(options.indexOf('france'));

    const selectRef = useRef(null);
    const searchRef = useRef(null);
    const optionRefs = useRef([]);

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setActive(false);
            };

        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {

            document.removeEventListener("mousedown", handleOutsideClick);

        };

    }, [selectRef]);

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (!active) return;

            if (event.code === "ArrowUp") {

                event.preventDefault();
                setSelected(prev => (prev - 1 < 0 ? options.length - 1 : prev - 1));

            } else if (event.code === "ArrowDown") {

                event.preventDefault();
                setSelected(prev => (prev + 1 >= options.length ? 0 : prev + 1));
            };

        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [active, options]);

    useEffect(() => {

        if (active && optionRefs.current[selected]) {

            const option = optionRefs.current[selected];
            const parent = option.parentElement;

            const parentHeight = parent.clientHeight;
            const optionHeight = option.clientHeight;

            const scrollTop = option.offsetTop - (parentHeight / 2) + (optionHeight / 2);

            parent.scrollTo({
                top: scrollTop,
                // behavior: 'smooth',
            });
        }
    }, [active, selected]);


    return (

        <div className="h-full w-full relative cursor-pointer" ref={selectRef}>

            <div
                className="h-full w-full flex flex-col justify-center"
                onClick={() => setActive(prev => !prev)}
            >

                <p className="capitalize text-xs">{title}</p>

                <div className="w-full flex justify-between">

                    <p className="text-sm capitalize select-none pointer-events-none">
                        {options[selected]}
                    </p>

                    <IoChevronDownOutline />

                </div>

            </div>

            <div className={`max-h-52 w-full bg-cream-400 absolute z-30 children:select-none flex flex-col p-4 space-y-1 overflow-y-scroll ${active ? 'block' : 'hidden'}`}>
                {
                    options.map((option, index) => (
                        <p
                            ref={(el) => (optionRefs.current[index] = el)}
                            onClick={() => {
                                setSelected(index);
                                setActive(false);
                            }}
                            className={`text-sm capitalize ${index == selected ? 'bg-neon-green' : 'hover:bg-cream-300'} `}
                        >
                            {option}
                        </p>
                    ))
                }
            </div>

        </div>

    )

}