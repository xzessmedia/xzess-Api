import moment, {Moment} from "moment";
import 'moment/locale/de'
import 'moment-range';
import 'moment-timezone';
import {ApiFilter} from "../models/api/ApiFilter.model";
const berlin = moment().tz("Europe/Berlin");
class ToolsService {
    async asyncForEach(array: Array<any>, callback: any) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    CreateDate(input?: moment.MomentInput) {
        return this.CreateMoment(input).utc(true).toDate();
    }

    CreateMoment(input?: moment.MomentInput) {
        return moment(input).tz("Europe/Berlin").utc(true);
    }

    FilterBuilder(offset?: any, limit?: any, datefilterFrom?: any, datefilterTo?: any, datefilterkey: string = 'CreatedAt'): ApiFilter {
        let t_filter: ApiFilter = {
            orderBy: {},
            where: {}
        };

        if (offset !== undefined) {
            t_filter.skip = Number(offset);
        }
        if (limit !== undefined) {
            t_filter.take = Number(limit);
        }
        if (datefilterFrom !== undefined) {
            t_filter.where = {
                [datefilterkey]: {
                    gte: moment(moment.utc(datefilterFrom)).toDate(),
                    lt: moment(moment.utc(datefilterTo)).toDate()
                }
            }
        }
        return t_filter;
    }

    CreateDateFilter(key: string, startdate: string, enddate: string) {
        let t_filter: any = {};
        if (startdate !== '' && enddate !== '') {
            t_filter.where = {
                key: {
                    gte: new Date(startdate),
                    lt: new Date(enddate)
                }
            }
        }

        return t_filter;
    }

    RemoveNulls(arr: Array<any>) {
        let t_new: Array<string> = [];
        arr.forEach((element)=>{
            if (element !== null) {
                t_new.push(element);
            }
        })
        return t_new;
    }

}

const TOOLS = new ToolsService();
export default TOOLS;