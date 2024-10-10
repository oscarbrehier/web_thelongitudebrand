'use client';
import { forwardRef, useEffect, useState } from "react";

const Input = forwardRef(({ 
        title, 
        type, 
        required = false, 
        onChange, 
        reset, 
        error = false, 
        validate = false,
        ...props 
    }, ref) => {

    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const titleValue = title.toLowerCase().replace(/\s+/g, "_");

    const handleChange = (e) => {

        const newValue = e.target.value;
        
        if (errorMessage) {
            validateField();
        };

        setValue(newValue);
        if (onChange) onChange(newValue);

    };

    useEffect(() => {

        if (reset) {

            setValue('');
            setErrorMessage(null);

        };

        if (validate == true) validateField();

    }, [reset, validate]);

    const validateField = () => {

        let error = '';

        if (!value) {
            error = `${title.charAt(0).toUpperCase() + title.slice(1)} is required`;
        };

        if (title === 'email' && value) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address';
            };

        };

        if (props.password && props.password !== value) {

            error = "Your passwords don't match.";

        };

        setErrorMessage(error);
        return;

    };

    return (

        <div className={`w-full ${errorMessage ? 'h-auto' : 'h-10'} bg-cream-300 flex flex-col justify-center`}>

            <input
                className={`w-full h-10 outline-none text-sm px-4 bg-transparent placeholder:capitalize placeholder-black ${errorMessage && 'border-l-2 border-error-red'}`}
                type={type}
                name={titleValue}
                id={titleValue}
                onChange={handleChange}
                value={value}
                placeholder={title}
                required={required}
                ref={ref}
                onBlur={validateField}
                {...props}
            />

            {errorMessage && (
                <div className="h-auto w-full bg-cream-100 py-1">
                    <p className="text-xs text-error-red">{errorMessage}</p>
                </div>
            )}

        </div>

    );
});

export default Input;