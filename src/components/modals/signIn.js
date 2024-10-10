import Input from "../ui/Input";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useModalContext } from "@/lib/context/ModalContext";
import signIn from "@/lib/authentication/signIn";
import { useRouter } from "next/navigation";

export default function SignInModal() {

    const { activeModal, openModal, closeModal } = useModalContext();
    const router = useRouter();

    const [resetInputs, setResetInputs] = useState(false);
    const [form, setForm] = useState({
        submit: false,
        error: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {

        closeModal();

        setForm(prev => ({ ...prev, error: '' }));
        setResetInputs(true);

    };

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, submit: true, error: '' }));

        const { error } = await signIn(form.email, form.password);

        if (error) {

            const commonErrorMessage = "No account matches the provided credentials. Please try again.";
            const errorMessages = {
                'auth/user-not-found': commonErrorMessage,
                'auth/wrong-password': commonErrorMessage,
                'auth/invalid-email': commonErrorMessage,
                'auth/invalid-credential': commonErrorMessage,
                'auth/user-disabled': "Account disabled. Please contact customer support for further help.",
            };

            // Set message based on error code or default message
            const message = errorMessages[error.code] || "Oops! An unexpected error occurred. Please try again.";
            setForm(prev => ({ ...prev, error: message }));

        } else {

            // router.push('/my-account/overview');
            closeModal();

        };

        setLoading(false);
        setForm(prev => ({ ...prev, submit: false }));

    };

    useEffect(() => {

        if (resetInputs == true) setResetInputs(false);

    }, [resetInputs]);

    return (

        <div className={`${activeModal !== 'signin' && 'hidden'} h-screen w-full fixed p-4 z-20 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-black bg-opacity-20`}>

            <div className="flex w-full h-full xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start">

                <div className="h-auto w-full bg-cream-100 p-4">

                    <div className="w-full h-auto flex justify-between items-center">

                        <p className="text-sm capitalize">login</p>

                        <button onClick={handleCloseModal} className="h-full bg-neon-green p-1">
                            <IoClose />
                        </button>

                    </div>

                    <div className="space-y-2 mt-8">

                        <Input
                            title='email'
                            type='email'
                            onChange={(value) => setForm(prev => ({ ...prev, email: value }))}
                            error={form.email}
                            reset={resetInputs}
                            validate={form.submit}
                            required={true}
                        />

                        <Input
                            title='password'
                            type='password'
                            onChange={(value) => setForm(prev => ({ ...prev, password: value }))}
                            error={form.password}
                            reset={resetInputs}
                            validate={form.submit}
                            required={true}
                        />

                    </div>

                    <div className="mt-4 space-y-2 w-full">

                        <div onClick={(event) => handleFormSubmit(event)} className="w-full h-10 bg-black flex items-center justify-center cursor-pointer">

                                {
                                loading
                                    ? (
                                        <div
                                            class="inline-block size-6 animate-spin rounded-full border-2 border-solid border-current border-e-neutral-700 align-[-0.125em] text-neon-green motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                            role="status">
                                            <span
                                                class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                            >Loading...</span>
                                        </div>
                                    )
                                    : <p className="text-white text-sm capitalize">login</p>
                            }

                        </div>

                        <>
                            {
                                form.error && (
                                    <p className="text-sm text-error-red w-full">{form.error}</p>
                                )
                            }
                        </>


                    </div>

                    <div className="text-sm mt-6 space-y-2">

                        <p>Forgot your password?</p>
                        <div className="flex">
                            <p className="text-neutral-500">Don't have an account? &nbsp;</p>
                            <p className="cursor-pointer capitalize" onClick={() => openModal('register')}>register</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};