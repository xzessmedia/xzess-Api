import {Express} from "express";
import {ActiveConfiguration} from "../../../../config";
const express = require('express');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const { init, validateRequest, validateResponse } = require('express-oas-validator');
const SwaggerFile = require('./swagger.json');
const app = express();

const SwaggerOptions = {
    info: {
        version: ActiveConfiguration.Version,
        title: ActiveConfiguration.Name,
        license: {
            name: 'MIT',
            url: 'http://example.com',
        },
        description: 'API desctiption',
        contact: {
            name: 'contact name',
            url: 'http://example.com',
            email: 'test@test.com',
        },
        termsOfService: 'http://example.com',
    },
    servers: [
        {
            url: `https://${ActiveConfiguration.PublicUrl}:${ActiveConfiguration.Port}`,
            description: 'The production API server',
        },
        {
            url: `http://${ActiveConfiguration.PublicUrl}:${ActiveConfiguration.Port}`,
            description: 'The staging API server',
        },
        {
            url: `http://localhost:${ActiveConfiguration.Port}`,
            description: 'The local API server',
        },
    ],
    security: {
        BasicAuth: {
            type: 'http',
            scheme: 'basic',
        },
        ApiKey: {
            type: 'apiKey',
            name: 'token',
            in: 'header'
        }


    },
    baseDir: __dirname,
    filesPattern: ['../../../routes/*.js'], // Glob pattern to find your jsdoc files
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
};

const SwaggerInstance = expressJSDocSwagger(app)(SwaggerOptions, SwaggerFile);

const serverApp = () => new Promise(resolve => {
    SwaggerInstance.on('finish', (data: any) => {
        init(data);
        resolve(app);
    });
});

export {
    app,
    SwaggerOptions,
    SwaggerFile,
    SwaggerInstance,
    serverApp
}