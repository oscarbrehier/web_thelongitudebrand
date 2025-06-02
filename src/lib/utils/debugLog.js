export default function debugLog(message) {
	if (process.env.NODE_ENV === "development") console.log(message);
};