import {Request, Response} from "express";
import {app, serverApp} from "../core/module/swagger/swagger";
import {ActiveConfiguration} from "../../config";
import {Log} from "../core/module/logging/logging";
const { init, validateRequest, validateResponse } = require('express-oas-validator');
import passport = require("passport");
import multer from 'multer';
import ORM from "../core/module/orm/orm";
const upload = multer({dest: ActiveConfiguration.Uploads.Path});

/**
 *  Route /api/v1/path
 *  See https://swaggerRouteLink
 *
 */
app.post('/api/v1/files', passport.authenticate('token', {session:false}), upload.single('file'), async (req: Request, res: Response) => {
    const uploadedFile  = req.file;
    console.log('Receiving File: '+ JSON.stringify(req.file));
    try {
        const filetype: any = req.query.filetype;
        const additional: any = req.query.additionaldata;
        if (uploadedFile !== undefined) {

            await ORM.files.create({
                data: {
                    UploadedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                    OriginalFilename: uploadedFile.originalname,
                    EncodingInfo: uploadedFile.encoding,
                    MimeType: uploadedFile.mimetype,
                    Size: uploadedFile.size,
                    StorageDestination: uploadedFile.destination,
                    Filename: uploadedFile.filename,
                    Path: uploadedFile.path,
                    Type: filetype,
                    AdditionalData: additional
                }
            });

            res.status(200).json({message: 'Upload successful, you can use the filename to receive'});

        } else {
            res.status(400).json({message: `No file uploaded.. add file with key 'file' to your request`});
        }

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }


});

/**
 *  Route /api/v1/path
 *  See https://swaggerRouteLink
 *
 */
app.get('/api/v1/files/id/:fileid', passport.authenticate('token', {session:false}), async (req:Request, res: Response) => {

    try {
        const FileId = req.params.fileid;

        if (FileId) {

            let t_result = await ORM.files.findFirst({
                where: {
                    Id: Number(FileId)
                }
            })

            if (t_result !== null) {
                res.status(200).download('../uploads/' + t_result.Filename, t_result.OriginalFilename || '');
            } else {
                res.status(400).json({message: 'no data received from database'});
            }
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }


});

/**
 *  Route /api/v1/path
 *  See https://swaggerRouteLink
 *
 */
app.get('/api/v1/files/name/:filename', passport.authenticate('token', {session:false}), async (req:Request, res: Response) => {

    try {
        const FileId:string = req.params.filename;

        if (FileId) {

            let t_result = await ORM.files.findFirst({
                where: {
                    OriginalFilename: FileId
                },
                orderBy: {
                    Id: 'desc'
                }
            });


            if (t_result !== null) {
                res.status(200).download(ActiveConfiguration.Uploads.Path + t_result.Filename, t_result.OriginalFilename || '');
            } else {
                res.status(400).json({message: 'no data received from database'});
            }
        }

    } catch (error) {
        console.log(error);
        res.send(error);
    }


});

module.exports = serverApp;