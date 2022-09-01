/**
 * @ Author: Tim Koepsel
 * @ Description:
 */
import {Express} from "express";
import express from 'express';
import * as http from "http";
import * as config from '../../../config'
import * as https from "https";
import * as fs from "fs";
import passport = require('passport');
import multer from 'multer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
var session = require('express-session')
import { Log } from "../module/logging/logging";
import {app} from "../module/swagger/swagger";
import {ActiveConfiguration} from "../../../config";
import {UniqueTokenStrategy} from "passport-unique-token";
import Helper from "../module/helper/helper";
import {ApiRoute} from "../../models/domain/apiroute";
import {ServerProcess} from "./ServerProcess";

class ApiServer {
    app: Express
    processor: ServerProcess
    server: http.Server | https.Server | undefined
    mode: 'http' | 'https'

    constructor() {
        this.processor = new ServerProcess();
        this.mode = 'http';
        this.app = app;
        this.InitServer();
    }

    InitServer() {
        this.app.set('port', process.env.PORT || 3000);
        this.LoadMiddleware();
        this.processor.Init();
    }

    LoadMiddleware() {
        this.app.use(cors());
        this.app.use(session({ secret: process.env.SESSION_SECRET, resave: false,
            saveUninitialized: true, cookie: { maxAge: 60000 }}))
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(multer({dest: ActiveConfiguration.Uploads.Path}).single('file'));
        this.app.use(cookieParser(process.env.SESSION_SECRET));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());

        passport.use(new UniqueTokenStrategy(
            (token, done) => {
                let auth = Helper.CheckAuth(token, done);
                if (auth == false) {
                    return done(null, false);
                } else {
                    return done(null,auth);
                }
            }
        ));
    }

    LoadRoutes(routes: Array<ApiRoute>) {
        routes.forEach((route) => {
            this.app.use(route.Path, require(route.ScriptPath));
        })
    }

    StartServer() {
        if (config.ActiveConfiguration.SSL.UseSSL === true) {
            const options = {
                key: fs.readFileSync(config.ActiveConfiguration.SSL.PrivateKey),
                cert: fs.readFileSync(config.ActiveConfiguration.SSL.Certificate)
            };

            this.server = https.createServer(options);
            this.mode = 'https';
        } else {
            this.server = http.createServer(this.app);
            this.mode = 'http';
        }

        this.server.listen(config.ActiveConfiguration.Port, ()=>{
            Log('Info',`${config.ActiveConfiguration.Name} Server | Version ${config.ActiveConfiguration.Version} | Port: ${this.app.get('port')} | Status: Server running`);
            console.log(`OpenApi available at ${this.mode}://${config.ActiveConfiguration.PublicUrl}:${config.ActiveConfiguration.Port}/api-docs`);
        });
    }

    GetServer() {
        return this.server;
    }

    GetApp() {
        return this.app;
    }

    StopServer() {
        this.server?.close((err)=>{
            console.log('Error while closing Server', err);
        })
    }
}

export default ApiServer;