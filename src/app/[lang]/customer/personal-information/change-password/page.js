'use client';
import updatePassword from "@/lib/authentication/updatePassword";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import getPasswordStrength from "@/lib/utils/getPasswordStrength";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, use } from "react";
import { z, ZodError } from "zod";

const passwordCriteria = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
const required_error = (fieldName) => `${fieldName} is required`;

const formSchema = z.object({
    currentPassword: z.string().min(1, { message: required_error("Current password") }),
    newPassword: z.string()
        .min(6, { message: "Password must be at least 6 characters long" })
        .refine(getPasswordStrength, {
            message: "Password is too weak. Include letters, numbers, and symbols"
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

    const [values, setValues] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setFormError("");
    };

    const isFormIncomplete = !values.currentPassword || !values.newPassword || !values.confirmNewPassword;

    // const resetErrors = () => {

    //     setInputValues((prev) => ({
    //         ...prev,
    //         currentPassword: { ...prev.currentPassword, error: "" },
    //         newPassword: { ...prev.newPassword, error: "" },
    //         confirmNewPassword: { ...prev.confirmNewPassword, error: "" }
    //     }));

    // };

    const handleSubmitForm = async () => {

        setLoading(true);
        setErrors({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        setFormError("");

        try {

            // const data = {
            //     currentPassword: formData.get("currentPassword"),
            //     newPassword: formData.get("newPassword"),
            //     confirmNewPassword: formData.get("confirmNewPassword"),
            // };

            formSchema.parse(values);

            await updatePassword(data.currentPassword, data.newPassword);
            router.push("/customer/personal-information");

        } catch (error) {

            if (error instanceof ZodError) {

                const formatted = error.flatten().fieldErrors;
                console.log(formatted)
                setErrors({
                    currentPassword: formatted.currentPassword?.[0] || "",
                    newPassword: formatted.newPassword?.[0] || "",
                    confirmNewPassword: formatted.confirmNewPassword?.[0] || "",
                });
                return;

            }

            switch (error) {
                case "auth/invalid-credential":
                    {
                        setErrors((prev) => ({
                            ...prev,
                            currentPassword: "Current password is invalid",
                        }));
                        break;
                    }
                case "auth/too-many-requests":
                    {
                        setFormError("Too many requests. Try again later.");
                        break ;
                    }
                default:
                    setFormError("An unexpected error occurred.");
                    break;
            }

        } finally {

            setLoading(false);

        };

    };

    return (

        <div className="w-full mt-16 pt-14 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <form action={handleSubmitForm}>

                    <h1 className="capitalize mx-2 my-1 text-lg">change password</h1>

                    <div className="space-y-2">

                        <InputWithLabel
                            title='current password'
                            value={values.currentPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={errors.currentPassword}
                            required={true}
                        />

                        <InputWithLabel
                            title='new password'
                            value={values.newPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={errors.newPassword}
                            required={true}
                        />

                        <InputWithLabel
                            title='confirm new password'
                            value={values.confirmNewPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={errors.confirmNewPassword}
                            required={true}
                        />

                        {formError !== "" && (
                            <p className="text-sm text-error-red">{formError}</p>
                        )}

                    </div>


                    <div className="mt-4 space-y-2">

                        <Button
                            title='save'
                            size='w-full h-14'
                            // onClick={(e) => handleSubmitForm(e)}
                            type="submit"
                            loading={loading}
                            disabled={isFormIncomplete}
                        />

                    </div>

                </form>

            </div>

        </div>

    );
};
