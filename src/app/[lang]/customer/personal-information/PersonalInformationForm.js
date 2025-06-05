'use client';
import { useState } from "react";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
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

export function PersonalInformationForm({ content, lang }) {

    const [error, setError] = useState({
        form: null,
        inputFirstName: null,
        inputLastName: null,
    });

    const [loading, setLoading] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const { user } = useAuthContext();

    const handleInputChange = (e) => {

        if (!isModified) setIsModified(true);

    };

    const validateForm = (data) => {

        try {

            formSchema.parse(data);
            return true;

        } catch (err) {

            if (err.errors) {

                const errors = err.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setError(prev => ({
                    ...prev,
                    inputFirstName: errors.firstName,
                    inputLastName: errors.lastName
                }));

            };

            return false;

        };

    };

    const getModifiedInputs = (data) => {

        return Object.keys(data).reduce((acc, key) => {
            if (data[key] !== content[key]) {
                acc[key] = data[key];
            }
            return acc;
        }, {});

    };

    const handleSubmitForm = async (event) => {

        event.preventDefault();
        setLoading(true);
        setError({ form: null, inputFirstName: "", inputLastName: "" });

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (!validateForm(data)) {
            setLoading(false);
            return;
        };

        const modifiedInputs = getModifiedInputs(data);

        if (Object.keys(modifiedInputs).length === 0) {
            setLoading(false);
            return;
        };

        try {

            const result = await updateUserProfile(user.uid, modifiedInputs);

            if (result?.errors) {

                setError(prev => ({ ...prev, form: "An error occured. Please try again or come back later." }));
                Sentry.captureException(result.errors);
                return;

            };

            setIsModified(false);

        } catch (err) {
            console.error(err);
            setError(prev => ({ ...prev, form: "An unexpected error occurred." }));
            Sentry.captureException(err);

        } finally {

            setLoading(false);

        };

    };

    return (

        <>

            <form onSubmit={handleSubmitForm} className="space-y-8">

                <div className="space-y-2">

                    <InputWithLabel
                        title='first name'
                        value={content.firstName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={error?.inputFirstName}
                    />

                    <InputWithLabel
                        title='last name'
                        value={content.lastName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={error?.inputLastName}
                    />

                    <InputWithLabel
                        title='email'
                        value={content.email}
                        type='email'
                        disabled
                    />

                    <InputWithLabel
                        title='date of birth'
                        type='date'
                        optional={true}
                        value={content.dateOfBirth}
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
                                checked={content.newsletterSubscriber}
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

                    {error.form !== "" && (
                        <p className="text-sm text-error-red">{error.form}</p>
                    )}

                    <Button
                        size='w-full h-14'
                        type="submit"
                        loading={loading}
                        disabled={!isModified}
                    >
                        save
                    </Button>

                    <Hyperlink
                        to="/customer/personal-information/change-password"
                        size='w-full h-14'
                        border={true}
                    >
                        change password
                    </Hyperlink>

                </div>

            </form>

        </>

    );

};
