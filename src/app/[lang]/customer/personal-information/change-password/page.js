'use client';
import { useEffect, useState } from "react";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import updatePassword from "@/lib/authentication/updatePassword";
import getPasswordStrength from "@/lib/getPasswordStrength";

export default function Page({ params: { lang } }) {

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

    const handleSubmitForm = async (event) => {

        event.preventDefault();

        const { currentPassword, newPassword: password, confirmNewPassword: confirmPassword } = inputValues;
        let error = false;

        setForm(prev => ({
            ...prev,
            submit: true
        }));

        if (password.value !== confirmPassword.value) {

            setInputValues(prev => ({
                ...prev,
                confirmNewPassword: {
                    ...prev.confirmNewPassword,
                    error: "Passwords don't match"
                },
            }));

            error = true;

        };

        if (error) {

            console.log(error);

            setTimeout(() => {
                setForm(prev => ({
                    ...prev,
                    submit: false
                }));
            }, 300);

            return

        };

        setTimeout(() => {
            setForm(prev => ({
                ...prev,
                submit: false
            }));
        }, 300);

        try {

            await updatePassword(currentPassword.value, password.value);

        } catch (e) {

            let returnMessage;

            if (e == "auth/invalid-credential") {

                setInputValues(prev => ({
                    ...prev,
                    currentPassword: {
                        ...prev.currentPassword,
                        error: "Current password is invalid",
                    }
                }));

            } else if (e == "auth/too-many-requests") {

                setForm(prev => ({
                    ...prev,
                    error: "Too many requests! Please wait a moment before trying again."
                }))

            }

        };

        // router.push("/customer/personal-ininputValuesation")

    };

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <div>

                    <p className="capitalize mx-2 my-1">change password</p>

                    <div className="space-y-2">

                        <InputWithLabel
                            title='current password'
                            value={inputValues.currentPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.currentPassword.error}
                            required={true}
                            submit={form.submit}
                            handleError={(e) => setForm(prev => ({ ...prev, hasErrors: e }))}
                        />

                        <InputWithLabel
                            title='new password'
                            value={inputValues.newPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.newPassword.error}
                            required={true}
                            submit={form.submit}
                            handleError={(e) => setForm(prev => ({ ...prev, hasErrors: e }))}
                            checkPasswordStrength={true}
                        />

                        <InputWithLabel
                            title='confirm new password'
                            value={inputValues.confirmNewPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={inputValues.confirmNewPassword.error}
                            required={true}
                            submit={form.submit}
                            handleError={(e) => setForm(prev => ({ ...prev, hasErrors: e }))}
                            password={inputValues.newPassword.value}
                        />

                        {form.error !== "" && (
                            <p className="text-sm text-error-red">{form.error}</p>
                        )}

                    </div>


                    <div className="mt-4 space-y-2">

                        <Button
                            title='save'
                            size='w-full h-14'
                            onClick={(e) => handleSubmitForm(e)}
                        />

                    </div>

                </div>

            </div>

        </div>

    );

};
