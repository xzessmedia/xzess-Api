export type MailConfig = {
    pool: boolean,
    host: string,
    port: number,
    secure: boolean,
    auth: {
        user: string,
        pass: string
    }
}