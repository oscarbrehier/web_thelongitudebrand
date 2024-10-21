'use client';
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

export default function PhoneSelect({ title, options, defaultValue }) {
    const [active, setActive] = useState(false);
    const [selected, setSelected] = useState(0);
    const [searchTerm, setSearchTerm] = useState(''); // For handling search input

    const selectRef = useRef(null);
    const searchRef = useRef(null); // For focusing on the hidden input
    const optionRefs = useRef([]);

    // Handle outside click
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setActive(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Handle keyboard navigation (up/down arrows)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!active) return;

            if (event.code === "ArrowUp") {
                event.preventDefault();
                setSelected((prev) => (prev - 1 < 0 ? options.length - 1 : prev - 1));
            } else if (event.code === "ArrowDown") {
                event.preventDefault();
                setSelected((prev) => (prev + 1 >= options.length ? 0 : prev + 1));
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [active, options]);

    // Scroll to selected option when active
    useEffect(() => {
        if (active && optionRefs.current[selected]) {
            const option = optionRefs.current[selected];
            const parent = option.parentElement;

            const parentHeight = parent.clientHeight;
            const optionHeight = option.clientHeight;

            const scrollTop = option.offsetTop - parentHeight / 2 + optionHeight / 2;

            parent.scrollTo({
                top: scrollTop,
            });
        }
    }, [active, selected]);

    // Focus on the hidden input when dropdown becomes active
    useEffect(() => {
        if (active) {
            searchRef.current?.focus(); // Focus on the hidden input
        }
    }, [active]);

    // Handle search input
    const handleSearch = (event) => {
        const value = event.target.value.toUpperCase();
        setSearchTerm(value);
        
        // Find the first option that matches the search term in the full name
        const foundIndex = options.findIndex(option => option.name.toUpperCase().startsWith(value));

        if (foundIndex !== -1) {
            setSelected(foundIndex); // Update the selected option if a match is found
        } else {
            setSelected(null); // Reset if no match is found
        }

        if (value.length >= 2) {

            setSearchTerm('');

        };
        
    };

    return (
        <div className="h-full w-full relative cursor-pointer" ref={selectRef}>
            <div className="h-full w-full flex flex-col justify-center" onClick={() => setActive(prev => !prev)}>
                <p className="capitalize text-xs">{title}</p>
                <div className="w-full flex justify-between">
                    <p className="text-sm capitalize select-none pointer-events-none">
                        {options[selected].code}
                    </p>
                    <IoChevronDownOutline />
                </div>
            </div>

            {/* Hidden Search Input */}
            <input
                ref={searchRef}
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                maxLength={2} // Limit input to 2 characters
                className="absolute opacity-0" // Hidden input
            />

            <div className={`max-h-52 w-40 bg-cream-400 absolute z-30 flex flex-col p-4 space-y-1 overflow-y-scroll ${active ? 'block' : 'hidden'}`}>
                {options.map((option, index) => (
                    <div
                        ref={(el) => (optionRefs.current[index] = el)}
                        key={index}
                        onClick={() => {
                            setSelected(index);
                            setActive(false);
                        }}
                        className={`text-sm capitalize flex ${index === selected ? 'bg-neon-green' : 'hover:bg-cream-300'}`}
                    >
                        <p>{option.name} </p>
                        &nbsp;
                        <p>{option.code}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
