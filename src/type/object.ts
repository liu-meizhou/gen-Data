import { genData, getGenerator } from '../index';
import { BuiltInOption, GenData, IntegerRange } from "src/type";
import { parseIntegerRange } from "src/utils";
import { genNumber } from "./number";

export type ObjectOption = {
    template?: {
        // key为object的key, value为string时表示类型, BuiltInOption可以表示类型和类型的参数
        [key: string]: string | GenData<any, any> | BuiltInOption
    },
    count?: IntegerRange 
};

const getMergeOption = (option?: ObjectOption) => {
    const template =  option?.template || {};
    const keys = Object.keys(template);
    const len = keys.length;
    const count = parseIntegerRange(option?.count ?? len);
    let loseCount = len - count; // 丢失数量
    const res = {} as Record<string, any>;
    keys.forEach((key, index) => {
        // 丢失数量等于剩余数量时，全部不生成数据;
        // 丢失数量大于0时候，用概率 loseCount/len 来确定是否丢失
        if (loseCount === (len - index) || (loseCount > 0 && genNumber({min: 0, max: len, fixed: 0}) < loseCount)) {
            loseCount--;
            return;
        }
        res[key] = template[key];
    })
    return res;
}

export const genObject = (option?: ObjectOption) => {
    const res = {} as Record<string, any>;
    const mergeOption = getMergeOption(option);
    Object.keys(mergeOption).forEach(key => {
        const value = mergeOption[key];
        if (typeof value === 'string') {
            const generator = getGenerator(value);
            if (!generator) {
                throw `类型：${value} 未注册`;
            }
            res[key] = generator();
        } else if (typeof value === 'function') {
            res[key] = value();
        } else {
            res[key] = genData(value);
        }
    })
    return res;
}
