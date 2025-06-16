import { ResetForm } from "./ResetForm";

export default async function Page({ params, searchParams }) {

    const { lang } = await params;
    const { error, email } = await searchParams;

    let globalError = null;

    switch (error) {
        case "reset-link/invalid-expired":
            globalError = "Oops! Your password reset link has expired or is invalid.";
            break;

        default:
            globalError = null;
            break;
    };

    return (

        <div className="h-screen w-full mt-16 pt-16 2md:grid grid-cols-4 gap-2">
            <div className="col-start-2 col-span-2 h-auto">

                <ResetForm 
                    lang={lang}
                    globalError={globalError}
                    initialEmail={email}
                />

            </div>
        </div>

    )

};