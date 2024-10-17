import camelize from "@/lib/camelize";
import { useState, useEffect } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function InputWithLabel({
    title,
    type = "text",
    value,
    disabled = false,
    optional = false,
    onChange,
    ...props
}) {

    const [inputValue, setInputValue] = useState(value || "");
    const titleValue = title.toLowerCase().replace(/\s+/g, "_");

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    const handleChange = (event) => {

        setInputValue(event.target.value);

        if (onChange) {
            onChange(event);
        };

    };

    return (
        <div className="w-full h-14 bg-cream-300 relative group flex items-center">

            <label
                htmlFor={titleValue}
                className={`
                    capitalize absolute text-sm left-4 transform transition-all duration-200 ease-in-out
                    pointer-events-none select-none
                    ${(inputValue || type === 'date') ? "top-1 text-xs translate-y-1" : "top-1/2 -translate-y-1/2"}
                    group-focus-within:top-1 group-focus-within:text-xs group-focus-within:translate-y-1
                    ${disabled ? 'text-neutral-500' : ''}
                `}>
                {title}
                {optional && (
                    <span className="text-[10px] text-neutral-600 uppercase mx-1">optional</span>
                )}
            </label>

            <input
                className={`w-full h-full outline-none bg-transparent text-sm px-4 pt-4 pb-1 ${disabled ? 'text-neutral-600' : ''}`}
                type={type === "password" && visible ? "text" : type}
                name={camelize(title)}
                value={inputValue}  // Bind the controlled input to inputValue
                onChange={handleChange}
                disabled={disabled}
                {...props}
            />

            {
                type == "password" && (
                    <div onClick={() => setVisible(!visible)} className="size-14 flex items-center justify-end children:cursor-pointer text-xs underline hover:no-underline p-4 select-none">
                        <p>
                            {
                                visible ? "hide" : "show"
                            }
                        </p>
                    </div>
                )
            }

        </div>

    );
}
