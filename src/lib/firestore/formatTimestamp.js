import { format } from "date-fns";

export default function formatTimestamp(timestamp, formatStr) {

    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);
    return format(date, formatStr);

};
