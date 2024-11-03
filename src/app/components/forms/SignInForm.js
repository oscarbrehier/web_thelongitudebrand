"use client"
import InputWithLabel from "../ui/InputWithLabel"
import Button from "../ui/Button"
import Link from "next/link"

export default function SignInForm({
    lang = null,
    handleForm = null,
    errors = null,
    status = null,
    email = null,
    handleActions = null
}) {

    return (

        <form onSubmit={handleForm}>

            <div className="space-y-2">

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

                {
                    errors?.form && <p className="text-error-red text-sm">{errors?.form}</p>
                }

            </div>

            <div className="mt-4 space-y-2">

                <Button
                    title="sign in"
                    size="w-full h-14"
                    type="submit"
                    loading={status == "loading"}
                />

                <div className="w-full flex flex-col text-sm space-y-2">

                    <Link
                        className="text-sm"
                        href="/auth/reset-password"
                    >
                        Forgot your password?
                    </Link>

                    <div className="flex">

                        <p className="text-neutral-500">Don't have an account? &nbsp;</p>

                        {
                            handleActions
                            ? <button onClick={(e) => handleActions(e, "sign_up")} className="cursor-pointer capitalize underline">sign up</button>
                            : <Link href="/auth/sign-up" className="cursor-pointer capitalize underline">sign up</Link>
                        }
                        
                    </div>

                </div>

            </div>

        </form>

    )

}