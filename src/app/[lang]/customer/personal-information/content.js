'use client';
import { useEffect, useState } from "react";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import { IoCheckmark } from "react-icons/io5";
import { useAuthContext } from "@/lib/context/AuthContext";
import updateUserProfile from "@/lib/authentication/updateUserProfile";
import Hyperlink from '@/app/components/ui/Hyperlink';
import Checkbox from "@/app/components/ui/Checkbox";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";

export const formSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "First name is required" }),
    lastName: z
        .string()
        .min(1, { message: "Last name is required" }),
});

export default function Content({ content, lang }) {

    const [form, setForm] = useState({
        error: null,
        inputErrors: {
            firstName: null,
            lastName: null
        }
    })
    const [inputs, setInputs] = useState({ ...content });
    const [loading, setLoading] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const { user } = useAuthContext();

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setInputs(prev => ({
            ...prev,
            [name]: newValue,
        }));

        if (!isModified) setIsModified(true);

    };

    const handleSubmitForm = async () => {

        setLoading(true); 
        setForm(prev => ({ ...prev, error: null, inputErrors: { firstName: "", lastName: "" } }));

        try {

            formSchema.parse(inputs);

            await updateUserProfile(user.uid, inputs);
            setIsModified(false);

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm(prev => ({
                    ...prev,
                    inputErrors: {
                        ...prev.error,
                        firstName: errors.firstName,
                        lastName: errors.lastName
                    }
                }));

                return;

            };

            setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));
            Sentry.captureException(error);

        } finally {

            setLoading(false);

        };

    };

    return (

        <>

            <div className="space-y-8">

                <div className="space-y-2">

                    <InputWithLabel
                        title='first name'
                        value={inputs.firstName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={form.inputErrors?.firstName}
                    />

                    <InputWithLabel
                        title='last name'
                        value={inputs.lastName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={form.inputErrors?.lastName}
                    />

                    <InputWithLabel
                        title='email'
                        value={inputs.email}
                        type='email'
                        disabled
                    />

                    <InputWithLabel
                        title='date of birth'
                        type='date'
                        optional={true}
                        value={inputs.dateOfBirth}
                        onChange={(e) => handleInputChange(e)}
                    />

                </div>

                <div className="space-y-4">

                    {/* <p className="capitalize mx-2 my-1 text-lg">preferences</p> */}

                    <div className="space-y-1">

                        <h2 className="">Communication Preferences</h2>

                        <div className="flex space-x-2 h-auto items-center">

                            <Checkbox
                                name="newsletterSubscriber"
                                onChange={handleInputChange}
                                size="6"
                                checked={inputs.newsletterSubscriber}
                            />

                            <div className="text-xs">

                                <p className="text-neutral-600">
                                    Be the first to receive Longitude news, including new collections, launches and sales. Sent twice a week.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="space-y-2">

                    {form.error !== "" && (
                        <p className="text-sm text-error-red">{form.error}</p>
                    )}

                    <Button
                        title='save'
                        size='w-full h-14'
                        onClick={handleSubmitForm}
                        loading={loading}
                        disabled={!isModified}
                    />

                    <Hyperlink
                        to="/customer/personal-information/change-password"
                        title='change password'
                        size='w-full h-14'
                        border={true}
                    />

                </div>

            </div>

        </>

    );

};
