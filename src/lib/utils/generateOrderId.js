import { v4 as uuidv4 } from 'uuid';

export default function generateOrderId(userId) {

    const uuid = uuidv4().replace(/-/g, '');

    const dateStr = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 8);

    const combinedString = `${uuid}${userId}${dateStr}`;

    const scrambledString = combinedString.split('').reduce((acc, char) => {
        const validChar = char.match(/[a-z0-9]/i) ? char.toUpperCase() : '';
        return acc + validChar;
    }, '');

    const orderId = `${scrambledString.slice(0, 4)}-${scrambledString.slice(4, 10)}-${scrambledString.slice(10, 14)}`;

    return orderId;

};