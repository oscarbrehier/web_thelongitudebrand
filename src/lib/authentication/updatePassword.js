import { getAuth, updatePassword as updateUserPassword } from 'firebase/auth';
import firebase_app, { database } from '../firebase/firebase';
import reauthenticateUser from './reauthenticateUser';
import { doc, getDoc, Timestamp, updateDoc } from '@firebase/firestore';
const auth = getAuth(firebase_app);

export default async function updatePassword(currentPassword, password) {

    const user = auth.currentUser;

    try {

        await reauthenticateUser(currentPassword);

        const ref = doc(database, "users", user.uid);
        const res = await getDoc(ref);

        if (res.exists) {

            const lastChanged = res.data().lastPasswordUpdate;
            const now = Timestamp.now();
            const timeSinceLastChange = now.seconds - lastChanged.seconds;

            if (lastChanged && timeSinceLastChange <= 3600) {

                throw "auth/too-many-requests";

            } else {

                await updateUserPassword(user, password);
                await updateDoc(ref, {
                    lastPasswordUpdate: Timestamp.now(),
                });

            };

        };

    } catch (err) {

        console.log(err.code);
        throw err;

    };

};