export function tBulk(t, keys, ns) {

	if (!keys) return null;

	if (Array.isArray(keys) && keys.length !== 0) {
		return keys.map((key) => t(key, ns)).join(" ");
	}

	return t(keys, ns);
 
};