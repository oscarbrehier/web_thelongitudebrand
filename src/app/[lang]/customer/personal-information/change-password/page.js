'use client';
import updatePassword from "@/lib/authentication/updatePassword";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { z } from "zod";

const passwordCriteria = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
const required_error = (fieldName) => `${fieldName} is required`;

const formSchema = z.object({
    currentPassword: z.string().min(1, { message: required_error("Current password") }),
    newPassword: z.string()
        .min(6, { message: "New password" })
        .refine(getPasswordStrength, {
            message: "Password is too weak. Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
        }),
    confirmNewPassword: z.string()
        .min(1, { message: "Please confirm your new password " })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"]
});

export default function Page(props) {
    const params = use(props.params);

    const {
        lang
    } = params;

    const router = useRouter();

    const [inputValues, setInputValues] = useState({
        currentPassword: {
            value: "",
            error: null
        },
        newPassword: {
            value: "",
            error: null
        },
        confirmNewPassword: {
            value: "",
            error: null
        }
    })

    const [form, setForm] = useState({
        submit: false,
        error: null,
        hasErrors: false
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;

        setInputValues(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                value: type === "checkbox" ? checked : value
            }
        }));

    };

    const resetErrors = () => {

        setInputValues((prev) => ({
            ...prev,
            currentPassword: { ...prev.currentPassword, error: "" },
            newPassword: { ...prev.newPassword, error: "" },
            confirmNewPassword: { ...prev.confirmNewPassword, error: "" }
        }));

    };

    const handleSubmitForm = async (formData) => {

        resetErrors();
        setLoading(true);

        try {

            const data = {
                currentPassword: formData.get("currentPassword"),
                newPassword: formData.get("newPassword"),
                confirmNewPassword: formData.get("confirmNewPassword"),
            };

            formSchema.parse(data);

            await updatePassword(data.currentPassword, data.newPassword);
            router.push("/customer/personal-information");

        } catch (error) {

            console.error(error)

            if (error.errors) {

                const errors = error.errors.reduce((acc, curr) => {

                    acc[curr.path[0]] = curr.message;
                    return acc;

                }, {});

                setInputValues((prev) => ({
                    ...prev,
                    currentPassword: { ...prev.currentPassword, error: errors.currentPassword || "" },
                    newPassword: { ...prev.newPassword, error: errors.newPassword || "" },
                    confirmNewPassword: { ...prev.confirmNewPassword, error: errors.confirmNewPassword || "" }
                }));

                return;

            };

            if (error == "auth/invalid-credential") {

                setInputValues(prev => ({
                    ...prev,
                    currentPassword: {
                        ...prev.currentPassword,
                        error: "Current password is invalid",
                    }
                }));

            } else if (error == "auth/too-many-requests") {

                setForm(prev => ({
                    ...prev,
                    error: "Too many requests! Please wait a moment before trying again."
                }))

            } else {

                setForm(prev => ({
                    ...prev,
                    error: "An error occured. Please try again later",
                }));

            };

        } finally {

            setLoading(false);

        };

    };

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <form action={handleSubmitForm}>

                    <h1 className="capitalize mx-2 my-1 text-lg">change password</h1>

                    <div className="space-y-2">

                        <InputWithLabel
                            title='current password'
                            value={inputValues.currentPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.currentPassword.error}
                            required={true}
                        />

                        <InputWithLabel
                            title='new password'
                            value={inputValues.newPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.newPassword.error}
                            required={true}
                            submit={form.submit}
                        />

                        <InputWithLabel
                            title='confirm new password'
                            value={inputValues.confirmNewPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.confirmNewPassword.error}
                            required={true}
                            submit={form.submit}
                        />

                        {form.error !== "" && (
                            <p className="text-sm text-error-red">{form.error}</p>
                        )}

                    </div>


                    <div className="mt-4 space-y-2">

                        <Button
                            title='save'
                            size='w-full h-14'
                            // onClick={(e) => handleSubmitForm(e)}
                            type="submit"
                            loading={loading}
                        />

                    </div>

                </form>

            </div>

        </div>

    );
};
