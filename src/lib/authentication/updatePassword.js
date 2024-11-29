import { getAuth, updatePassword as updateUserPassword } from 'firebase/auth';
import firebase_app, { database } from '../firebase/client';
import reauthenticateUser from './reauthenticateUser';
import { doc, getDoc, Timestamp, updateDoc } from '@firebase/firestore';
import setSessionCookie from './setSessionCookie';
const auth = getAuth(firebase_app);

export default async function updatePassword(currentPassword, password) {

    const user = auth.currentUser;

    try {

        await reauthenticateUser(currentPassword);

        const ref = doc(database, "users", user.uid);
        const res = await getDoc(ref);

        if (res.exists) {

            const lastChanged = res.data().lastPasswordUpdate;

            if (lastChanged) {

                const now = Timestamp.now();

                const timeSinceLastChange = now.seconds - lastChanged.seconds;

                if (timeSinceLastChange <= 3600) {

                    throw "auth/too-many-requests";

                };

            };

            await updateUserPassword(user, password);
            await updateDoc(ref, {
                lastPasswordUpdate: Timestamp.now(),
            });

            const newIdToken = await user.getIdToken(true);
            await setSessionCookie(newIdToken);

        };

    } catch (err) {

        console.log(err);
        throw err;  

    };

};