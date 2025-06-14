export default async function getPasswordStrength(password) {

    const response = await fetch("/api/auth/password-strength", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
    });

    const data = await response.json();
    return data.score >= 4;

};