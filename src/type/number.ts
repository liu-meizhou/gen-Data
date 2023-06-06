import { IntegerRange } from "src/type";
import { parseIntegerRange } from "src/utils";

export interface NumberOption {
    min?: number;
    max?: number;
    fixed?: IntegerRange
};

const getMergeOption = (option?: NumberOption) => {
    const res: NumberOption = {
        min: option?.min,
        max: option?.max,
        fixed: parseIntegerRange(option?.fixed ?? '0-10')
    }
    if (res.fixed! < 0) {
        throw '传入的小数点必须大于等于0'
    }
    if (res.min !== undefined && res.max !== undefined) {
    } else if (res.min !== undefined) {
        res.max = genNumber({min: res.min, max: res.min + 100, fixed: 0});
    } else if (res.max !== undefined) {
        res.min = genNumber({min: res.max - 100, max: res.max, fixed: 0});
    } else {
        res.min = genNumber({min: -100, max: 100, fixed: 0});
        res.max = genNumber({min: res.min, max: res.min + 100, fixed: 0});
    }

    return res as {
        min: number;
        max: number;
        fixed: number
    };
}

export const genNumber = (option?: NumberOption) => {
    const mergeOption = getMergeOption(option);
    return parseFloat((mergeOption.min + Math.random() * (mergeOption.max - mergeOption.min)).toFixed(mergeOption.fixed));
}

