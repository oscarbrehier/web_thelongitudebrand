import { getAuth, updatePassword as updateUserPassword } from 'firebase/auth';
import firebase_app, { database } from '../firebase/client';
import reauthenticateUser from './reauthenticateUser';
import { doc, getDoc, Timestamp, updateDoc } from '@firebase/firestore';
import { captureException } from '@sentry/nextjs';
const auth = getAuth(firebase_app);

/**
 * Update the password of a user
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export default async function updatePassword(currentPassword, password) {

    const user = auth.currentUser;

    try {

        const ref = doc(database, "users", user.uid);
        const res = await getDoc(ref);

        if (res.exists) {

            const lastChanged = res.data().lastPasswordUpdate;
            const now = Timestamp.now();

            if (lastChanged) {

                const timeSinceLastChange = now.seconds - lastChanged.seconds;
                if (timeSinceLastChange <= 3600) {
                    throw "auth/too-many-requests";
                }

            }

            await reauthenticateUser(currentPassword);
            await updateUserPassword(user, password);
            await updateDoc(ref, {
                lastPasswordUpdate: Timestamp.now(),
            });

        };

    } catch (err) {

        captureException(err);
        throw err;

    };

};