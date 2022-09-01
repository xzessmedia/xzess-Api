/**
 * @ Author: Tim Koepsel <tim.koepsel@picard.de>
 * @ Description:
 */

import { setting } from "@prisma/client";
import SETTINGS from "../../services/settings.service";


class Installation {
    static _applicationName: string;

    async Init(appname: string) {
        Installation._applicationName = appname;
    }

    async Install() {
        await SETTINGS.CreateSetting('ApplicationName', Installation._applicationName, 'string');
    }

    async Finish() {

    }
}