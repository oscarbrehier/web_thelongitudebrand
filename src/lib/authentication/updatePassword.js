import { getAuth, updatePassword as updateUserPassword } from 'firebase/auth';
import firebase_app from './firebase';

const auth = getAuth(firebase_app);

export default async function updatePassword(password) {

    const user = auth.currentUser;

    try {

        await updatePassword(user, password);

    } catch (err) {

        return err;

    };

};