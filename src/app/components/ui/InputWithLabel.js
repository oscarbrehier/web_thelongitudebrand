"use client"
import camelize from "@/lib/utils/camelize";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import { useState, useEffect } from "react";

export default function InputWithLabel({
    title,
    type = "text",
    value,
    onChange,
    submit,
    required,
    disabled = false,
    optional = false,
    error = null,
    handleError,
    ...props
}) {

    const [inputValue, setInputValue] = useState(value || "");
    const titleValue = title.toLowerCase().replace(/\s+/g, "_");

    const [visible, setVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setInputValue(value || "");
    }, [value]);

    useEffect(() => {
        
        if (error) setErrorMessage(error);

    }, [error]);

    useEffect(() => {

        if (submit) validateField();

    }, [submit]);

    const validateField = () => {

        let err = null;

        if (type === 'email' && inputValue) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(inputValue)) {
                err = 'Please enter a valid email address';
            };

        };
        
        if (type == "password" && props.checkPasswordStrength) {
            
            const {score} = getPasswordStrength(inputValue);
            if (score <= 3) err = "Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
            
        };

        if (required && inputValue == "") err = `${title.charAt(0).toUpperCase() + title.slice(1)} is required`;

        if (props.password && props.password !== inputValue) {
            err = "Your passwords don't match";
        };

        setErrorMessage(err);
        handleError(!!err);

    };

    const handleChange = (event) => {

        setInputValue(event.target.value);

        if (onChange) {
            onChange(event);
        };

    };

    const labelClasses = `
        capitalize absolute text-sm left-4 transform transition-all duration-200 ease-in-out pointer-events-none select-none
        ${inputValue || type === "date" ? "top-1 text-xs translate-y-1" : "top-1/2 -translate-y-1/2"}
        group-focus-within:top-1 group-focus-within:text-xs group-focus-within:translate-y-1
        ${disabled ? "text-neutral-500" : ""}
    `;

    return (

        <div className="h-auto w-full flex flex-col">

            <div className={`w-full h-14 bg-cream-300 relative group flex items-center ${errorMessage && 'border-l-2 border-error-red'}`}>

                <label
                    htmlFor={titleValue}
                    className={labelClasses}
                >
                    {title}
                    {optional && (
                        <span className="text-[10px] text-neutral-600 uppercase mx-1">
                            optional
                        </span>
                    )}
                </label>

                <input
                    className={`w-full h-full outline-none bg-transparent text-sm px-4 pt-4 pb-1 ${disabled ? "text-neutral-600" : ""} `}
                    type={type === "password" && visible ? "text" : type}
                    name={camelize(title)}
                    value={inputValue} // Bind the controlled input to inputValue
                    onChange={handleChange}
                    disabled={disabled}
                    {...props}
                />

                {type == "password" && (
                    <div
                        onClick={() => setVisible(!visible)}
                        className="size-14 flex items-center justify-end children:cursor-pointer text-xs underline hover:no-underline p-4 select-none"
                    >
                        <p>{visible ? "hide" : "show"}</p>
                    </div>
                )}

            </div>

            {
                errorMessage && (
                    <p className="mt-1 text-sm text-error-red">
                        {errorMessage}
                    </p>
                )
            }

        </div>

    );
};