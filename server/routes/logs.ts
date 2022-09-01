import {Request, Response} from "express";
import {app, serverApp} from "../core/module/swagger/swagger";
import {ActiveConfiguration} from "../../config";
import {Log} from "../core/module/logging/logging";
import ORM from "../core/module/orm/orm";

/**
 * A Log
 * @typedef {object} Log
 * @property {string} Type.required - The Type of the Logfile - enum:Info,Debug,Error,Fatal,Warning
 * @property {string} Message.required - Log Message
 * @property {string} Source.required - Source Info for the log
 */

/**
 * POST /api/v1/logs
 * @summary This is the summary or description of the endpoint
 * @security ApiKey
 * @tags Logging
 * @param {Log} request.body.required - Log File - multipart/form-data
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
app.post('/api/v1/logs', async (req: Request, res: Response) => {
    Log('Info', 'Request received to /api/v1/logs');



    try {
        let result = await ORM.logs.create({
            data: {
                LoggedAt: new Date(),
                Type: req.body.Type,
                Message: req.body.Message,
                Source: req.body.Source
            }
        })
        res.status(200).send(result);
    } catch (e) {
        Log('Error', 'Error while posting new Logfile at /api/v1/logs', Object(e));
        res.status(500).send(e);
    }
});



module.exports = serverApp;