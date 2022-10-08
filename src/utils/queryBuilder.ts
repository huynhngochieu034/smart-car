import { Types } from "mongoose";

export const createQueryBuilder = (searchDTO: any) => {
    const queryBuilder: any = {};
    const keys = Object.keys(searchDTO);
    for (const item of keys) {
        if (!item.includes(".")) continue;
        const methods = item.split(".");
        let key = methods[0];
        let method = methods[1];
        if (methods.length === 3) {
            key = methods[0] + "." + methods[1];
            method = methods[2];
        }
        if (searchDTO[item]) {
            switch (method) {
                case "equals":
                    queryBuilder[key] = convertTypeData(searchDTO[item]);
                    break;
                case "equalsObjectId":
                    queryBuilder[key] = new Types.ObjectId(searchDTO[item]);
                    break;
                case "contains":
                    queryBuilder[key] = { $regex: '.*' + searchDTO[item] + '.*' };
                    break;
                case "lessThan":
                    queryBuilder[key] = {
                        ...queryBuilder[key],
                        $lt: new Date(Date.parse(searchDTO[item]))
                    };
                    break;
                case "greaterThan":
                    queryBuilder[key] = {
                        ...queryBuilder[key],
                        $gte: new Date(Date.parse(searchDTO[item])),
                    }
                    break;
                case "equalsDate":
                    const date = searchDTO[item].split('T');
                    const lt = date[0] + 'T23:59:59.999Z';
                    const gte = date[0] + 'T00:00:00.000Z';
                    queryBuilder[key] = {
                        $lt: new Date(Date.parse(lt)),
                        $gte: new Date(Date.parse(gte))
                    }
                    break;
                case "includes":
                    const includes = searchDTO[item].split(',');
                    queryBuilder[key] = {
                        "$in": includes
                    }
                    break;
                case "greaterThanNumber":
                    queryBuilder[key] = {
                        ...queryBuilder[key],
                        "$gte": Number(searchDTO[item])
                    }
                    break;
                case "lessThanNumber":
                    queryBuilder[key] = {
                        ...queryBuilder[key],
                        "$lte": Number(searchDTO[item])
                    }
                    break;
                default: break;
            }
        }
    }
    return queryBuilder;
}

const convertTypeData = (data: any) => {

    if (!isNaN(data)) return Number(data);

    if (data === 'true' || data === 'false') {
        if (data === 'true') return true;
        else return false;
    }
    
    return data;
} 