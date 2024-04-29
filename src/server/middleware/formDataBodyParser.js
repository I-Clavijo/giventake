// middleware - parse body json data - this is good for cases when we use FormData to pass files
// at frontend just append an attribute to FormData called jsonData and it will parse it
const formDataBodyParser = (req, res, next) => {
    if (req?.body?.jsonData) {
        const parsedJsonData = JSON.parse(req.body.jsonData);
        delete req.body.jsonData;
        req.body = { ...req.body, ...parsedJsonData };
    }
    next();
}

export default formDataBodyParser;