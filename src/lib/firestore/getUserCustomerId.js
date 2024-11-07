import getUserFromUid from "../authentication/getUserFromUid";

export default async function getUserCustomerId(userId) {

    if (!userId) throw new Error("Invalid parameter `userId` for getUserCustomerId");

    try {

        const user = await getUserFromUid(userId);
        return user ? user.stripeCustomerId : null;

    } catch (err) {

        throw new Error("Could not retrieve user customer ID");

    };

};