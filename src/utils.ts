import { IntegerRange } from "./type";
import { genNumber } from "./type/number";

export const parseIntegerRange = (num: IntegerRange) => {
    if (typeof num === 'number') {
        if (!Number.isInteger(num)) {
            throw '传入的num必须是整数';
        }
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
