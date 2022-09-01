import pino from 'pino';
import {PrettyOptions} from "pino-pretty";

const L = pino({
    name: process.env.APP_ID,
    level: process.env.LOG_LEVEL,
    transport: {
        target: 'pino-pretty',
        options: { translateTime: true, colorize: true }
    }
});

function Log(type: 'Info' | 'Error' | 'Debug' | 'Warning' | 'Fatal' | 'Silent' | 'Trace', message: string, obj?: object) {
    switch (type) {
        case "Info":
            if (obj !== undefined) {
                L.info(obj, message);
            } else {
                L.info(message);
            }
            break;
        case "Error":
            if (obj !== undefined) {
                L.error(obj, message);
            } else {
                L.error(message);
            }
            break;
        case "Debug":
            if (obj !== undefined) {
                L.debug(obj, message);
            } else {
                L.debug(message);
            }
            break;
        case "Warning":
            if (obj !== undefined) {
                L.warn(obj, message);
            } else {
                L.warn(message);
            }
            break;
        case "Fatal":
            if (obj !== undefined) {
                L.fatal(obj, message);
            } else {
                L.fatal(message);
            }
            break;
        case "Silent":
            if (obj !== undefined) {
                L.silent(obj, message);
            } else {
                L.silent(message);
            }
            break;
        case "Trace":
            if (obj !== undefined) {
                L.trace(obj, message);
            } else {
                L.trace(message);
            }
            break;
        default:
            if (obj !== undefined) {
                L.info(obj, message);
            } else {
                L.info(message);
            }
    }
}

export {
    Log,
    L
};