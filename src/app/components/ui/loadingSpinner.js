export default function LoadingSpinner() {

    return (

        <div
            class="inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-e-neutral-700 align-[-0.125em] text-neon-green motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
            <span
                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>

    );

};