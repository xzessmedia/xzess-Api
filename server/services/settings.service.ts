/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Description:
 */
import ORM from "../core/module/orm/orm";

export type SettingValue = {
    value: any
}

class SettingsService {
    LoadSetting(key: string) {
        return new Promise(async (resolve, reject) => {
            try {
                let result = await ORM.setting.findFirst({
                    where: {
                        SettingKey: key
                    }
                });
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    UpdateSetting(key: string, value: object) {
        return new Promise(async (resolve, reject) => {
            try {
                let t_setting: any = await this.LoadSetting(key);
                t_setting.SettingValue = JSON.stringify(value);
                let result = ORM.setting.update({
                    data: t_setting,
                    where: {
                        Id: t_setting.Id
                    }
                });
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    CreateSetting(key: string, value: any, valuetype: 'string'|'number'|'object'|'boolean') {
        return new Promise(async (resolve, reject) => {
            try {
                let t_val: SettingValue = {
                    value: value
                };

                let result = await ORM.setting.create({
                    data: {
                        SettingKey: key,
                        SettingValue: JSON.stringify(t_val),
                        ValueType: valuetype,
                        IsActive: true
                    }
                });
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }
}

const SETTINGS = new SettingsService();
export default SETTINGS;