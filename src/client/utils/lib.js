import axios from "axios";

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