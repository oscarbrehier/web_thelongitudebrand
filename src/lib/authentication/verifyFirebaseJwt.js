import * as jose from 'jose';

let publicKeys;
const firebaseProjectId = "auth-thelongitudebrand";
const publicKeysUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys";

const getPublicKeys = async (url) => {

    if (publicKeys) {
        return publicKeys;
    };

    const res = await fetch(url);

    publicKeys = await res.json();
    return publicKeys;

};

const verifyFirebaseJwt = async (firebaseJwt) => {

    const publicKeys = await getPublicKeys(`https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com`);

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

const verifyFirebaseSessionJwt = async (session) => {

    const publicKeys = await getPublicKeys(publicKeysUrl);

    const { payload, protectedHeader } = await jose.jwtVerify(session, async (header) => {

        const x509Cert = publicKeys[header.kid];

        if (!x509Cert) {
            throw new Error("Invalid key ID");
        };

        return await jose.importX509(x509Cert, "RS256");

    });

    if (payload.aud !== firebaseProjectId) throw new Error("Invalid audience");
    if (payload.iss !== `https://session.firebase.google.com/${firebaseProjectId}`) throw new Error("Invalid issuer");
    if (!payload.sub || typeof payload.sub !== 'string') throw new Error("Invalid subject");

    // const currentTime = Math.floor(Date.now() / 1000);
    // if (payload.exp < currentTime) throw new Error("Session has expired");
    // if (payload.iat > currentTime) throw new Error("Issued-at time is in the future");
    // if (payload.auth_time > currentTime) throw new Error("Authentication time is in the future");

    return payload.sub;

};

// export default verifyFirebaseJwt;
export default verifyFirebaseSessionJwt