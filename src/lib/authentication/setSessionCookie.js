export default async function setSessionCookie(idToken) {

    const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ idToken }),
    });

    const resBody = await response.json();

    if (response.ok && resBody.success) {

        return true;

    } else return false;

};
