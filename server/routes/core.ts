import {Request, Response} from "express";
import {app, serverApp} from "../core/module/swagger/swagger";
import {ActiveConfiguration} from "../../config";
import {Log} from "../core/module/logging/logging";
const { init, validateRequest, validateResponse } = require('express-oas-validator');
var express = require('express');
import nodemailer from 'nodemailer';
import passport = require("passport");

/**
 * GET /api/v1/core/status
 * @summary This is the summary or description of the endpoint
 * @security ApiKey
 * @tags Core
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example response - 200 - example success response
 * {
 *   "Name": "Api Name",
 *   "Status": "Online",
 *   "Time": "",
 *   "Version": "0.1"
 * }
 */
app.get('/api/v1/core/status', async (req: Request, res: Response) => {
    Log('Info', 'Request received to /api/v1/core/status');
    res.send({
        Name: ActiveConfiguration.Name,
        Status: 'Online',
        Time: new Date().toISOString(),
        Version: ActiveConfiguration.Version
    })
});

/**
 * POST /api/v1/core/mail
 * @summary This is the summary or description of the endpoint
 * @security ApiKey
 * @tags Core
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 * @example response - 200 - example success response
 * {
 *   "Name": "Api Name",
 *   "Status": "Online",
 *   "Time": "",
 *   "Version": "0.1"
 * }
 */
app.post('/api/v1/core/mail', passport.authenticate('token', {session: false}), async (req: Request, res: Response) => {
    try {
        let transport = nodemailer.createTransport(ActiveConfiguration.Mail);

        let t_mailObj = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        };

        // Populate with query data
        t_mailObj.from = <string> req.body.from;
        t_mailObj.to = <string> req.body.to;
        t_mailObj.subject = <string> req.body.subject;
        t_mailObj.text = <string> req.body.text;
        t_mailObj.html = <string> req.body.html;


        let mail = await transport.sendMail(t_mailObj);
        console.log(JSON.stringify(mail));

        Log('Info','Sending E-Mail by Api', t_mailObj);
        res.status(200).send(mail);
    } catch (error) {
        res.status(500).send(error);
    }
})


module.exports = serverApp;