export default function handleFirebaseError(code) {

    const defaultError = "An error occured. Please try again or come back later.";
    const commonSignInErrorMessage = "No account matches the provided credentials. Please try again.";

    const errorMessages = {
        'auth/user-not-found': commonSignInErrorMessage,
        'auth/wrong-password': commonSignInErrorMessage,
        'auth/invalid-email': commonSignInErrorMessage,
        'auth/invalid-credential': commonSignInErrorMessage,
        'auth/user-disabled': "Account disabled. Please contact customer support for further help.",
        'auth/weak-password': 'Password should at least be 6 characters long.',
        'auth/email-already-in-use': 'This email is already in use. Please try logging in or use a different email address.',
        'auth/network-request-failed': defaultError
    };

    return errorMessages[code] || defaultError;

};