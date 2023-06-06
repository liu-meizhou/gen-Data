import { getGenerator } from "../index";
import { BuiltInOption, IntegerRange } from "src/type";
import { genBaseType, parseIntegerRange } from "src/utils";

export type ArrayOption = {
    len?: IntegerRange;
} & BuiltInOption;

const getMergeOption = (option?: ArrayOption) => {
    const res = {
        len: parseIntegerRange(option?.len ?? '0-10'),
        type: option?.type || genBaseType(),  // 默认只能基础类型，防止无限循环
        // @ts-ignore
        typeOption: option?.typeOption
    }
    if (res.len < 0) {
        throw '数组的长度必须大于等于0'
    }
    return res;
}

export const genArray = <R>(option?: ArrayOption): R[] => {
    const mergeOption = getMergeOption(option);
    const generator = getGenerator(mergeOption.type);
    if (!generator) {
        throw `类型：${mergeOption.type} 未注册`;
    }
    const res = [];
    for (let i = 0; i < mergeOption.len; i++) {
        res.push(generator(mergeOption.typeOption))
    }
    return res;
}
