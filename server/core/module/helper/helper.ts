/**
 * @ Author: Tim Koepsel
 * @ Create Time: 23.06.2020 11:28:42
 * @ Modified by: Tim Koepsel
 * @ Modified time: 01.12.2020 13:07:15
 * @ Description:
 */
import {Log} from "../logging/logging";
import {ApiKey} from "../../../models/domain/apikey";


export default class Helper {
    static CheckAuth(token: any, done: any) {
        let result:boolean | object = false;
        let hasFound = false;

        const keys_raw: string = process.env.APIKEYS || '';
        let keys: Array<ApiKey> = [];

        // Parse Keys from ENV
        try {
            let t_keys = JSON.parse(keys_raw);
            t_keys.forEach((element: ApiKey) => {
                keys.push(element);
                Log('Debug', `Api Key for User ${element.User} has been loaded`);
            })
        } catch (e) {
            Log('Error', `Api Keys could not been loaded.. is the .env file not existing or the APIKEYS Element broken or not existing? It needs to be a valid json array!`);
        }

        keys.forEach((key: ApiKey) => {
            if (key.Key === token) {

                Log("Info", "Authorized Access",key);
                result = {User: key.User, Token: key.Key};
                hasFound = true;
            }
        });
        // If no auth found, invalidate
        if (hasFound == false) {
            Log("Warning", "Unauthorized Access",token);
        }

        return result;
    }
}