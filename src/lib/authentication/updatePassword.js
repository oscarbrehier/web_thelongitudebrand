import { getAuth, updatePassword as updateUserPassword } from 'firebase/auth';
import firebase_app from './firebase';
import reauthenticateUser from './reauthenticateUser';

const auth = getAuth(firebase_app);

export default async function updatePassword(currentPassword, password) {

    const user = auth.currentUser;
    

    try {

        await reauthenticateUser(currentPassword);

        // await updateUserPassword(user, password);

    } catch (err) {

        throw err;

    };

};