import axios from "axios";
import { differenceInMinutes, differenceInHours, differenceInDays, isToday, isTomorrow, isYesterday } from 'date-fns'

export const getFormData = (dataObject, fileListPropertyName) => {
    const formData = new FormData();
    const dataObjectClone = { ...dataObject };
    const fileList = dataObjectClone[fileListPropertyName];

    //add attachments only if they exist
    if (!!fileList?.length) {
        for (const item of fileList) {
            console.log(item);
            formData.append('attachment', item, item.name);
        }
    }

    // delete file property from the object
    delete dataObjectClone[fileListPropertyName];

    //append all other properties
    formData.append('json', JSON.stringify(dataObjectClone));

    return formData;
};

// Function to check if the input is an object
function isObject(input) {
    return input && typeof input === 'object' && input.constructor === Object;
}


// Example objects
// const obj1 = { a: null, b: undefined, c: null };    // true
// const obj2 = {};                                    // true
export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 ? true : Object.values(obj).every(val => val == null);
}



export function getRelativeTime(inputDate) {
    const now = new Date();
    const date = new Date(inputDate);

    // Ensure input date is valid
    if (isNaN(date)) {
        return "Invalid date";
    }

    // Calculate the difference in minutes, hours, and days
    const diffInMinutes = differenceInMinutes(date, now);
    const diffInHours = differenceInHours(date, now);
    const diffInDays = differenceInDays(date, now);

    // Determine relative time
    if (isToday(date)) {
        return diffInMinutes === 0 ? "Right now" : (diffInMinutes > 0 ? `${diffInMinutes} minute(s) from now` : `${-diffInMinutes} minute(s) ago`);
    } else if (isTomorrow(date)) {
        return "Tomorrow";
    } else if (isYesterday(date)) {
        return "Yesterday";
    } else if (diffInDays === 1) {
        return "1 day from now";
    } else if (diffInDays === -1) {
        return "1 day ago";
    } else if (diffInDays > 0) {
        return `${diffInDays} day(s) from now`;
    } else {
        return `${-diffInDays} day(s) ago`;
    }
}