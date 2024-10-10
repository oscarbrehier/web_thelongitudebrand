import * as jose from 'jose';

let publicKeys;
const firebaseProjectId = "auth-thelongitudebrand";

const getPublicKeys = async () => {

    if (publicKeys) {
        return publicKeys;
    };

    const res = await fetch(
        `https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com`,
    );

    publicKeys = await res.json();
    return publicKeys;

};

const verifyFirebaseJwt = async (firebaseJwt) => {

    const publicKeys = await getPublicKeys();

    const decodedToken = await jose.jwtVerify(

        firebaseJwt,

        async (header, _alg) => {
            const x509Cert = publicKeys[header.kid];
            const publicKey = await jose.importX509(x509Cert, "RS256");
            return publicKey;
        },

        {
            issuer: `https://securetoken.google.com/${firebaseProjectId}`,
            audience: firebaseProjectId,
            algorithms: ["RS256"],
        },

    );

    return {
        payload: decodedToken.payload,
        protectedHeader: decodedToken.protectedHeader
    };

};

export default verifyFirebaseJwt;