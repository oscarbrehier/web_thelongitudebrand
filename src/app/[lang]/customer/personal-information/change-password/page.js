'use client';
import { useState } from "react";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Button from "@/components/ui/Button";

const calculatePasswordStrength = (password) => {

    let score = 0;

    if (password.length >= 6) score += 10;
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[\W_]/.test(password)) score += 10;

    if (score === 0) return { score, label: 'very weak' };
    if (score <= 10) return { score, label: 'weak' };
    if (score <= 20) return { score, label: 'average' };
    if (score <= 30) return { score, label: 'good' };
    return { score, label: 'strong' };

};

export default function Page() {

    const [form, setForm] = useState({
        newPassword: {
            value: "",
            error: null
        },
        confirmNewPassword: {
            value: "",
            error: null
        },
    });

    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        label: "very weak",
    });

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: {
                ...prev[name],
                value: type === "checkbox" ? checked : value
            }
        }));

        if (type === "password") {

            const passwordScore = calculatePasswordStrength(value);

            setPasswordStrength({
                ...passwordScore
            });

        };

    };

    const handleSubmitForm = async (event) => {

        event.preventDefault();

        const { newPassword: password, confirmNewPassword: confirmPassword } = form;
        const { score } = calculatePasswordStrength(password);

        console.log(score)

        if (score !== 40) {

            setForm(prev => ({
                ...prev,
                newPassword: {
                    ...prev.newPassword,
                    error: "Choose a password with at least 6 characters, including a mix of letters, numbers, and symbols"
                },
            }));

        };

        if (password !== confirmPassword) {

            setForm(prev => ({
                ...prev,
                confirmNewPassword: {
                    ...prev.confirmNewPassword,
                    error: "Passwords don't match"
                },
            }));

            return;

        };

    };

    return (

        <div className="w-full mt-16 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <div>

                    <p className="capitalize mx-2 my-1">change password</p>

                    <div className="space-y-2">

                        <div className="flex flex-col space-y-1">

                            <InputWithLabel
                                title='new password'
                                value={form.newPassword.value}
                                type='password'
                                onChange={(e) => handleInputChange(e)}
                                error={form.newPassword.error}
                            />

                            <div className="flex flex-col space-y-1">

                                {/* <p className="text-sm text-neutral-600">Minimum of 6 characters, with upper and lowercase, a number and a symbol</p> */}

                            </div>

                        </div>

                        <InputWithLabel
                            title='confirm new password'
                            value={form.confirmNewPassword.value}
                            type='password'
                            onChange={(e) => handleInputChange(e)}
                            error={form.confirmNewPassword.error}
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
