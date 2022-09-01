import 'dotenv/config'
import {ApiConfig} from "./server/models/domain/apiconfig";

const ActiveConfiguration: ApiConfig = {
    Name: process.env.APP_ID || 'xApi',
    Version: '0.62',
    Port: Number(process.env.PORT),
    PublicUrl: 'localhost',
    Mode: process.env.MODE || 'Staging',
    ShowDebugMessages: true,
    Crypt: {
        Password: process.env.SESSION_SECRET || 'xApiSecretPassword'
    },
    Mail: {
        pool: true,
        host: 'localhost',
        port: 587,
        secure: false,
        auth: {
            user: '',
            pass: ''
        }
    },
    Auth: {
        Url: '',
        Key: undefined
    },
    Uploads: {
        Path: './uploads/'
    },
    SSL: {
        UseSSL: false,
        PrivateKey: '/etc/ssl/crt/mycert.key',
        Certificate: '/etc/ssl/crt/mycert.crt'
    },
    Databases: {
        Mysql: []
    }
}

export {
    ActiveConfiguration
}