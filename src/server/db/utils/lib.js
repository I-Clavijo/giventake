export function flattenObject(obj, parentKey = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flattenObject(obj[key], fullKey));
        } else {
            acc[fullKey] = obj[key];
        }
        return acc;
    }, {});
}