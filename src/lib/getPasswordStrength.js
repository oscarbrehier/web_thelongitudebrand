import zxcvbn from "zxcvbn";

export default function getPasswordStrength(password) {

    return zxcvbn(password);

};