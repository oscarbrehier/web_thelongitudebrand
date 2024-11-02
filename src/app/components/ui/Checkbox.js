import { IoCheckmark } from "react-icons/io5";

export default function Checkbox({
    name,
    onChange,
    checked,
    size = "6",
    ...props
}) {

    return (

        <div className="relative flex items-center justify-center">

            <input
                className={`appearance-none border-[1px] bg-cream-50 peer size-${size} ${checked ? "border-black" : "border-neutral-400"}`}
                type="checkbox"
                onChange={onChange}
                name={name}
                checked={checked}
            />

            <div className="absolute hidden peer-checked:block pointer-events-none">
                <IoCheckmark className="size-full" />
            </div>

        </div>

    );

};