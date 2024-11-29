'use client';
import updatePassword from "@/lib/authentication/updatePassword";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useTranslation } from "@/app/i18n/client";

const formSchema = (t) => z.object({
    currentPassword: z.string().min(1, { message: t("password_current_required") }),
    newPassword: z.string().min(6, { message: t("password_new_required") })
        .refine(getPasswordStrength, {
            message: t("password_too_weak")
        }),
    confirmNewPassword: z.string().min(1, { message: t("password_new_confirm_required") })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: t("password_not_matching"),
    path: ["confirmNewPassword"]
});

export default function Page({ params: { lang } }) {

    const router = useRouter();
    const { t } = useTranslation(lang, "inputs");

    const [form, setForm] = useState({
        error: null,
        currentPassword: null,
        newPassword: null,
        confirmNewPassword: null
    });

    const [loading, setLoading] = useState(false);

    const resetErrors = () => {

        setForm((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        }));

    };

    const handleSubmitForm = async (event) => {

        event.preventDefault();

        resetErrors();
        setLoading(true);

        try {

            const formData = new FormData(event.target);

            const data = {
                currentPassword: formData.get("currentPassword"),
                newPassword: formData.get("newPassword"),
                confirmNewPassword: formData.get("confirmNewPassword"),
            };


            formSchema(t).parse(data);

            if (data.currentPassword == data.newPassword) throw "auth/password-same-as-previous";

            await updatePassword(data.currentPassword, data.newPassword);
            router.push("/customer/personal-information");

        } catch (error) {

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setForm((prev) => ({
                    ...prev,
                    currentPassword: errors.currentPassword || "",
                    newPassword: errors.newPassword || "",
                    confirmNewPassword: errors.confirmNewPassword || ""
                }));

                return;

            };

            switch (error) {

                case "auth/invalid-credential":

                    setForm(prev => ({
                        ...prev,
                        currentPassword: "Current password is invalid"
                    }));

                    break;

                case "auth/too-many-requests":

                    setForm(prev => ({
                        ...prev,
                        error: "Too many requests! Please wait a moment before trying again."
                    }))


                    break;

                case "auth/password-same-as-previous":

                    setForm(prev => ({
                        ...prev,
                        newPassword: "The new password must be different from the current password."
                    }))

                    break;

                default:

                    setForm(prev => ({
                        ...prev,
                        error: "An error occured. Please try again later",
                    }));

                    break;

            };

        } finally {

            setLoading(false);

        };

    };

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <form onSubmit={handleSubmitForm}>

                    <h1 className="mx-2 my-1 text-lg">{t("password_change")}</h1>

                    <div className="space-y-2">

                        <InputWithLabel
                            title={t("password_current")}
                            name="currentPassword"
                            type='password'
                            error={form.currentPassword}
                            required={true}
                        />

                        <InputWithLabel
                            title={t("password_new")}
                            name="newPassword"
                            type='password'
                            error={form.newPassword}
                            required={true}
                        />

                        <InputWithLabel
                            title={t("password_new_confirm")}
                            name="confirmNewPassword"
                            type='password'
                            error={form.confirmNewPassword}
                            required={true}
                        />

                        {form.error !== "" && (
                            <p className="text-sm text-error-red">{form.error}</p>
                        )}

                    </div>


                    <div className="mt-4 space-y-2">

                        <Button
                            title='save'
                            size='w-full h-14'
                            type="submit"
                            loading={loading}
                        />

                    </div>

                </form>

            </div>

        </div>

    );

};
