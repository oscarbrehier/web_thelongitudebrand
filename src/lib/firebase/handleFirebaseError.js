import { tBulk } from "@/app/i18n/utils";

export default function handleFirebaseError(code, trans) {

    const defaultError = tBulk(trans, ["unexpected_error", "try_refresh_or_later"], { ns: "error" });
    const commonSignInErrorMessage = trans("firebase.auth_common_sign_in", { ns: "error" });

    const errorMessages = {
        'auth/user-not-found': commonSignInErrorMessage,
        'auth/wrong-password': commonSignInErrorMessage,
        'auth/invalid-email': commonSignInErrorMessage,
        'auth/invalid-credential': commonSignInErrorMessage,
        'auth/user-disabled': trans("firebase.auth_user_disabled", { ns: "error" }),
        'auth/weak-password': trans("password_too_weak", { ns: "validation" }),
        'auth/email-already-in-use': trans("firebase.auth_email_already_in_use", { ns: "error" }),
        'auth/network-request-failed': defaultError
    };

    return errorMessages[code] || defaultError;

};