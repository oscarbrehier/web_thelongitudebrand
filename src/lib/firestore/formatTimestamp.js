const getUserTimezone = () => {

    if (typeof window !== 'undefined') {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    };

    return 'UTC';

};

export default function formatTimestamp(timestamp) {

    const date = timestamp.toDate();
    const timezone = getUserTimezone();

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timezone
    };

    return date.toLocaleString('en-US', options) + ' UTC' + date.getTimezoneOffset() / -60;

};
