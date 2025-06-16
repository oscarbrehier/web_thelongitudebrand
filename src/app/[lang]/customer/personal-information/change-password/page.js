'use client';
import updatePassword from "@/lib/authentication/updatePassword";
import InputWithLabel from "@/app/components/ui/InputWithLabel";
import Button from "@/app/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState, use, useEffect } from "react";
import { ZodError } from "zod";
import { useTranslation } from "@/app/i18n/client";
import { updatePasswordSchema } from "@/lib/schema";

export default function Page(props) {

    const params = use(props.params);
    const {
        lang
    } = params;

    const router = useRouter();
    const { t } = useTranslation(lang, ["auth", "common", "error"])

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
    const [status, setStatus] = useState("idle");

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setFormError("");
    };

    useEffect(() => {
        const allFilled = Object.values(values).every(Boolean);
        setStatus(allFilled ? "ready" : "idle");
    }, [values]);

    const handleSubmitForm = async () => {

        setStatus("submitting");
        setErrors({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
        setFormError("");

        try {

            await updatePasswordSchema.parseAsync(values);
            await updatePassword(values.currentPassword, values.newPassword);
            router.push("/customer/personal-information");
            setStatus("success");

        } catch (error) {

            setStatus("error");

            if (error instanceof ZodError) {

                const formatted = error.flatten().fieldErrors;
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
                            currentPassword: "password_invalid",
                        }));
                        break;
                    }
                case "auth/too-many-requests":
                    {
                        setFormError("too_many_requests");
                        break;
                    }
                default:
                    setFormError("unexpected_error");
                    break;
            }

        }

    };

    return (

        <div className="w-full mt-16 pt-14 2md:grid grid-cols-4 gap-2">

            <div className="col-start-2 col-span-2 h-auto">

                <form action={handleSubmitForm}>

                    <h1 className="capitalize mx-2 my-1 text-lg">{t("change_password")}</h1>

                    <div className="space-y-2">

                        <InputWithLabel
                            name="currentPassword"
                            title={t("current_password")}
                            value={values.currentPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={t(errors.currentPassword)}
                            required={true}
                            lang={lang}
                        />

                        <InputWithLabel
                            name="newPassword"
                            title={t("new_password")}
                            value={values.newPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={t(errors.newPassword)}
                            required={true}
                            lang={lang}
                        />

                        <InputWithLabel
                            name="confirmNewPassword"
                            title={t("confirm_new_password")}
                            value={values.confirmNewPassword}
                            type='password'
                            onChange={handleInputChange}
                            error={t(errors.confirmNewPassword)}
                            required={true}
                            lang={lang}
                        />

                        {formError !== "" && (
                            <p className="text-sm text-error-red">{t(formError, { ns: "error" })}</p>
                        )}

                    </div>


                    <div className="mt-4 space-y-2">

                        <Button
                            size='w-full h-14'
                            type="submit"
                            loading={status === "submitting"}
                            disabled={status !== "ready"}
                        >
                            {t("save", { ns: "common" })}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );
};
