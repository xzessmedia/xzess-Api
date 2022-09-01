export type MysqlConfig = {
    host: string,
    user: string,
    password: string,
    database: string,
    connectionLimit: number,
    dateStrings: boolean
}