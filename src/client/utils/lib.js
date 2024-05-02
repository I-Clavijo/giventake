export const getFormData = (dataObject, fileListPropertyName) => {
    const formData = new FormData();
    const dataObjectClone = { ...dataObject };
    const fileList = dataObjectClone[fileListPropertyName];

    if (!!fileList.length) {
        for (const item of fileList) {
            console.log(item);
            formData.append('attachment', item, item.name);
        }
    }

    delete dataObjectClone[fileListPropertyName];

    //append all other properties
    for (const key in dataObjectClone) {
        const value = dataObjectClone[key];
        formData.append(key, value);
    }

    return formData;
};