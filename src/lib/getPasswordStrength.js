    import zxcvbn from "zxcvbn";

export default function getPasswordStrength(password) {

    const {score} = zxcvbn(password);
    return score >= 4; 

};