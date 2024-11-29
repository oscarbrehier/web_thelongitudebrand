'use client';
import { useEffect, useState } from "react";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import { useAuthContext } from "@/lib/context/AuthContext";
import updateUserProfile from "@/lib/authentication/updateUserProfile";
import Hyperlink from '@/app/components/ui/Hyperlink';
import Checkbox from "@/app/components/ui/Checkbox";
import * as Sentry from "@sentry/nextjs";
import { z } from "zod";
import { useTranslation } from "@/app/i18n/client";

export const formSchema = (t) => z.object({
    firstName: z
        .string()
        .min(1, { message: t("first_name_required") }),
    lastName: z
        .string()
        .min(1, { message: t("last_name_required") }),
});

export default function Content({ content, lang }) {

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        error: null,
        inputErrors: {
            firstName: null,
            lastName: null
        },
        firstName: null,
        lastName: null,
        email: null,
        dateOfBirth: null,
        newsletterSubscriber: null
    });

    const { t } = useTranslation(lang, ["inputs", "customer"]);
    const { user } = useAuthContext();

    useEffect(() => {

        setForm(prev => ({ ...prev, ...content }));

    }, [content]);

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

    };

    const hasChanges = () => {

        if (!form || !content) return false;
        return Object.keys(content).some((key) => form[key] !== content[key]);

    };
    

    const validateForm = (data) => {

        try {

            formSchema(t).parse(data);
            return true;

        } catch (err) {

            if (err.errors) {

                const errors = err.errors.reduce((acc, curr) => {

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
        setForm(prev => ({ ...prev, error: null, inputErrors: { firstName: "", lastName: "" } }));

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        data.newsletterSubscriber = data.newsletterSubscriber === "on";

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

                setForm(prev => ({ ...prev, error: "An error occured. Please try again or come back later." }));
                Sentry.captureException(result.errors);
                return;

            };

        } catch (err) {

            console.error(err);
            setForm(prev => ({ ...prev, error: "An unexpected error occurred." }));
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
                        title={t("first_name")}
                        name="firstName"
                        value={content.firstName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={form.inputErrors?.firstName}
                    />

                    <InputWithLabel
                        title={t("last_name")}
                        name="lastName"
                        value={content.lastName}
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                        error={form.inputErrors?.lastName}
                    />

                    <InputWithLabel
                        title={t("email")}
                        value={content.email}
                        type='email'
                        disabled
                    />

                    <InputWithLabel
                        title={t("birth_date")}
                        name="dateOfBirth"
                        type='date'
                        optional={true}
                        value={content.dateOfBirth}
                        onChange={(e) => handleInputChange(e)}
                    />

                </div>

                <div className="space-y-4">

                    {/* <p className="capitalize mx-2 my-1 text-lg">preferences</p> */}

                    <div className="space-y-1">

                        <h2 className="">{t("customer:preferences_communication")}</h2>

                        <div className="flex space-x-2 h-auto items-center">

                            <Checkbox
                                name="newsletterSubscriber"
                                onChange={handleInputChange}
                                size="6"
                                checked={form.newsletterSubscriber || false}
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
                        title={t("save")}
                        size='w-full h-14'
                        type="submit"
                        loading={loading}
                        disabled={!hasChanges()}
                    />

                    <Hyperlink
                        to="/customer/personal-information/change-password"
                        title={t("customer:password_change")}
                        size='w-full h-14'
                        border={true}
                    />

                </div>

            </form>

        </>

    );

};
