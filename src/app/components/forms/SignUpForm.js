"use client"
import Button from "../ui/Button";
import InputWithLabel from "../ui/InputWithLabel";
import Link from "next/link";
import Checkbox from "../ui/Checkbox";

export default function SignUpForm({
    lang = null,
    handleForm = null,
    handleActions = null,
    errors = null,
    loading = null,
    email = null,
}) {

    return (

        <form onSubmit={handleForm}>

            <div className="space-y-2">

                <div className="grid grid-cols-2 gap-2">

                    <InputWithLabel
                        title="first name"
                        required={true}
                        error={errors?.firstName}
                    />

                    <InputWithLabel
                        title="last name"
                        required={true}
                        error={errors?.lastName}
                    />

                </div>

                <InputWithLabel
                    title="email"
                    type="email"
                    required={true}
                    value={email}
                    error={errors?.email}
                />

                <InputWithLabel
                    title="password"
                    type="password"
                    required={true}
                    error={errors?.password}
                />

                <InputWithLabel
                    title="confirm password"
                    type="password"
                    required={true}
                    error={errors?.confirmPassword}
                />

                {
                    errors?.form && <p className="text-error-red text-sm">{errors.form}</p>
                }

            </div>

            <div className="mt-4 space-y-2">

                <div className="flex text-sm space-x-3">

                    <Checkbox
                        type="checkbox"
                        name="newsletter"
                        size="4"
                    />

                    <p>Subscribe to our newsletter</p>

                </div>

                <div className="flex text-sm space-x-3">

                    <Checkbox
                        type="checkbox"
                        id="terms"
                        name="terms"
                        size="4"
                    />

                    <p className={errors?.terms && "text-error-red"}>
                        By selecting "Sign Up", you are confirming that you have read and agree to thelongitudebrand's &nbsp;
                        <Link className="underline" href="/legal/terms-conditions">Terms & Conditions</Link>
                    </p>

                </div>


            </div>

            <div className="mt-4 space-y-2">

                <Button
                    title="sign up"
                    size="w-full h-14"
                    type="submit"
                    loading={loading}
                />

                <div className="text-sm flex">

                    <p  className="text-neutral-500">
                        Already have an account? &nbsp;
                    </p>

                    {
                        handleActions 
                        ? <button onClick={(e) => handleActions(e, "sign_in")} href="/auth/sign-in" className="underline capitalize">sign in</button>
                        : <Link href="/auth/sign-in" className="underline capitalize">sign in</Link>
                    }

                </div>

            </div>

        </form>

    );

};