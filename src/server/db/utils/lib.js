import mongoose from "mongoose";

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

export const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export function convertToUpperCase(word) {
    // Split the word based on spaces or camel case
    const wordsArray = word.split(/(?=[A-Z])|\s/);

    // Convert each word to uppercase and join with underscore
    const result = wordsArray.map(w => w.toUpperCase()).join('_');

    return result;
}