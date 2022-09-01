import {MailConfig} from "./mailconfig";
import {MysqlConfig} from "./mysqlconfig";

export type ApiConfig = {
    Name: string,
    Version: string,
    Port: number,
    PublicUrl: string,
    Mode: 'Staging' | 'Production' | string,
    ShowDebugMessages: boolean,
    Crypt: {
        Password: string
    },
    Mail: MailConfig,
    Auth?: {
        Url: string,
        Key?: string
    },
    Uploads: {
        Path: string
    },
    SSL: {
        UseSSL: boolean,
        PrivateKey: string,
        Certificate: string
    },
    Databases?: {
        Mysql: Array<MysqlConfig>
    }
}