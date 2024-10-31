export default function LoadingSpinner({
    color = "border-e-neutral-700"
}) {

    return (

        <div
            class={`${color} inline-block size-6 animate-spin rounded-full border-2 border-solid border-current align-[-0.125em] text-neon-green motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>

    );

};