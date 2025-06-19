'use client';
import { useTranslation } from "@/app/i18n/client";
import camelize from "@/lib/utils/camelize";
import { forwardRef, useEffect, useState } from "react";

const Input = forwardRef(({
    title,
    lang,
    type = "text",
    required = false,
    onChange,
    reset,
    error = false,
    validate = false,
    value: inputValue,
    ...props
}, ref) => {

    const { t } = useTranslation(lang, ["common"]);

    const [value, setValue] = useState(inputValue || "");
    const [errorMessage, setErrorMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const titleValue = title.toLowerCase().replace(/\s+/g, "_");

    const handleChange = (e) => {

        const newValue = e.target.value;

        setValue(newValue);
        if (onChange) onChange(newValue);

    };

    useEffect(() => {

        setErrorMessage(error || null);

    }, [error])

    useEffect(() => {

        if (inputValue !== value) {
            setValue(inputValue || "");
        };

    }, [inputValue]);

    useEffect(() => {

        if (reset) {

            setValue('');
            setErrorMessage(null);

        };

    }, [reset, validate]);

    return (
        <div className={`w-full ${errorMessage ? 'h-auto' : 'h-10'} bg-cream-300 flex flex-col justify-center`}>

            <div className="w-full h-full flex justify-between">

                <input
                    className={`w-full h-10 outline-none md:text-sm text-base px-4 bg-transparent placeholder:capitalize placeholder-black ${errorMessage && 'border-l-2 border-error-red'}`}
                    type={type === "password" && visible ? "text" : type}
                    name={camelize(title)}
                    id={titleValue}
                    onChange={handleChange}
                    value={value}
                    placeholder={title}
                    required={required}
                    ref={ref}
                    // onBlur={() => validateField(value)}
                    {...props}
                />

                {type === "password" && (
                    <div onClick={() => setVisible(!visible)} className="h-10 p-2 flex items-center justify-center children:cursor-pointer text-xs underline hover:no-underline select-none">
                        <p>
                            {visible
                                ? t("hide")
                                : t("show")
                            }
                        </p>
                    </div>
                )}

            </div>

            {errorMessage && (

                <div className="h-auto w-full bg-cream-100 py-1">
                    <p className="text-xs text-error-red">{errorMessage}</p>
                </div>

            )}

        </div>
    );
});

export default Input;
