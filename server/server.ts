import './core/module/env/env';
import ApiServer from "./core/base/ApiServer";
import {ApiRoute} from "./models/domain/apiroute";
import {SubRoutine} from "./core/base/SubRoutine";

const server = new ApiServer();

// Initialize all Subroutines here
const routines: Array<SubRoutine> = [

]

// Add all Routes here
const routes: Array<ApiRoute> = [
    {
        Path: '/api/v1/core',
        ScriptPath: '../../routes/core'
    },
    {
        Path: '/api/v1/files',
        ScriptPath: '../../routes/files'
    },
    {
        Path: '/api/v1/logs',
        ScriptPath: '../../routes/logs'
    }
];

server.LoadRoutes(routes);
server.StartServer();