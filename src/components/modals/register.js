import { useModalContext } from "@/lib/context/ModalContext";
import Input from "../ui/Input";
import { IoClose } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../ui/loadingSpinner";
import register from "@/lib/authentication/register";

export default function RegisterModal() {

    const { activeModal, closeModal } = useModalContext();

    const [resetInputs, setResetInputs] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        submit: false,
        error: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        newsletter: false,
        termsAndConditions: false,
    });

    const handleCloseModal = () => {

        closeModal();
        setResetInputs(true);

    };

    useEffect(() => {

        if (resetInputs == true) setResetInputs(false);

    }, [resetInputs])

    const handleFormSubmit = async (event) => {

        event.preventDefault();
        setLoading(true);
        setForm(prev => ({ ...prev, error: '', submit: true }));

        const { password, confirmPassword, termsAndConditions } = form;

        // Validate passwords and terms and conditions
        if (password !== confirmPassword) {
            setForm(prev => ({ ...prev, error: "Your passwords don't match." }));
            setLoading(false);
            return;
        };

        if (!termsAndConditions) {
            setForm(prev => ({ ...prev, error: 'You must agree to the terms and conditions before proceeding.' }));
            setLoading(false);
            return;
        };

        // Attempt registration
        const { error } = await register(form);

        if (error) {

            const errorMessages = {
                'auth/weak-password': 'Password should at least be 6 characters long.',
                'auth/email-already-in-use': 'This email is already in use. Please try logging in or use a different email address.',
            };

            const message = errorMessages[error.code] || "Oops! An unexpected error occurred. Please try again.";
            setForm(prev => ({ ...prev, error: message }));

        };

        setLoading(false);
        setForm(prev => ({ ...prev, submit: false }));

    };

    return (

        <div className={`${activeModal !== 'register' && 'hidden'} h-screen w-full fixed p-4 z-20 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-black bg-opacity-20`}>

            <div className="flex w-full h-full xl:col-start-4 lg:col-start-3 md:col-start-2 md:col-span-2 col-start-1 col-span-full items-start">

                <div className="h-auto w-full bg-cream-100 p-4">

                    <div className="w-full h-auto flex justify-between items-center">

                        <p className="text-sm capitalize">register</p>

                        <button onClick={handleCloseModal} className="h-full bg-neon-green p-1">
                            <IoClose />
                        </button>

                    </div>

                    <div className="space-y-2 mt-8">

                        <div className="grid grid-cols-2 gap-2">

                            <Input
                                title='first name'
                                type='text'
                                reset={resetInputs}
                                onChange={(value) => setForm(prev => ({ ...prev, firstName: value }))}
                                validate={form.submit}
                            />

                            <Input
                                title='last name'
                                type='text'
                                reset={resetInputs}
                                onChange={(value) => setForm(prev => ({ ...prev, lastName: value }))}
                                validate={form.submit}
                            />

                        </div>

                        <Input
                            title='email'
                            type='email'
                            reset={resetInputs}
                            onChange={(value) => setForm(prev => ({ ...prev, email: value }))}
                            validate={form.submit}
                        />

                        <Input
                            title='password'
                            type='password'
                            reset={resetInputs}
                            onChange={(value) => setForm(prev => ({ ...prev, password: value }))}
                            validate={form.submit}
                        />

                        <Input
                            title='confirm password'
                            type='password'
                            reset={resetInputs}
                            onChange={(value) => setForm(prev => ({ ...prev, confirmPassword: value }))}
                            validate={form.submit}
                            password={form.password}
                        />

                    </div>

                    <div className="mt-4 space-y-2">

                        <div className="flex text-xs space-x-4">
                            <input
                                type="checkbox"
                                checked={form.newsletter}
                                onChange={() => setForm(prev => ({ ...prev, newsletter: !prev.newsletter }))}
                            />
                            <p>Subscribe to our newsletter</p>
                        </div>

                        <div className="flex text-xs space-x-4">
                            <input
                                type="checkbox"
                                checked={form.termsAndConditions}
                                onChange={() => setForm(prev => ({ ...prev, termsAndConditions: !prev.termsAndConditions }))}
                            />
                            <p>
                                By selecting "Register", you are confirming that you have read and agree to thelongitudebrand's <span>Terms & Conditions</span>
                            </p>
                        </div>

                    </div>

                    <div className="mt-4 space-y-2 w-full">

                        <div onClick={(event) => handleFormSubmit(event)} className="w-full h-10 bg-black flex items-center justify-center cursor-pointer">

                            {
                                loading
                                    ? <LoadingSpinner />
                                    : <p className="text-white text-sm capitalize">register</p>
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

                </div>

            </div>

        </div>

    );

};