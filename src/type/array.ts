import { Mock } from "src/generator";
import { IntegerRange } from "src/type";
import { parseIntegerRange } from "src/utils";

// 用useArray来写，可以输入类型
export type ArrayOption<T> = {
    len?: IntegerRange;
} & T;

const getMergeOption = <T>(option?: ArrayOption<T>) => {
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

export const useGenArray = <P>(mock: Mock) => {
    type GenKey = ReturnType<mock.genType>;
    const genArray = <T extends GenKey>(option?: P): R[] => {
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
    return genArray 
}
