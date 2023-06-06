import { getGenerators } from "./generator";
import { BuiltInType, IntegerRange } from "./type";
import { genNumber } from "./type/number";
import { genString } from "./type/string"

export const genBaseType = () => {
    return genString({
        charSet: [BuiltInType.boolean, BuiltInType.number, BuiltInType.string, BuiltInType.dateTime],
        len: 1
    }) as BuiltInType
};

export const genType = () => {
    return genString({
        charSet: getGenerators(),
        len: 1
    }) as BuiltInType
};

export const parseIntegerRange = (num: IntegerRange) => {
    if (typeof num === 'number') {
        return num;
    }
    let min = 0, max = 100;
    if (typeof num === 'string') {
        const [minStr, maxStr] = num.split('-');
        min = parseInt(minStr, 10);
        max = parseInt(maxStr, 10);
    } else if (typeof num === 'object') {
        min = num.min;
        max = num.max;
    }
    // 校验
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw '传入的范围必须是整数';
    } else if (min > max) {
        throw '传入的min必须小于max';
    }
    return genNumber({
        min,
        max,
        fixed: 0
    });
};
