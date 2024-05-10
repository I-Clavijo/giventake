import { logEvents } from './logEvents.js';

// handles productional error
const productionError = (err, res) => {
    console.log("\n\n------ begin: ------");
    console.log("ERROR: ", err);
    console.log("------ end: ------\n\n");

    // operational error: send message to client about the error
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Sends a generic message to the client about the error
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
};

// Handles development errore
// sends back the error message, and additional information about the error
const developmentError = (err, res) => {
    if(!err?.isOperational) console.error(err.stack);
    else console.error('[Error] ', err.message);
    

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errLog.txt');

    if (process.env.NODE_ENV === "development") {
        developmentError(err, res);
    } else if (process.env.NODE_ENV === "production") {
        productionError(err, res);
    }
    
    if(!res.headersSent) {
        res.status(500).send(err.message);
    }
}

export default errorHandler;