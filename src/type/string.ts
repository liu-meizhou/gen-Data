import { BuiltInType, IntegerRange } from "src/type";
import { parseIntegerRange } from "src/utils";
import { genArray } from "./array";

export interface StringOption {
    charSet?: string | string[]; // string[] 的场景是我要在 enable 和 disable 中生成一个，可以配置 { charSet: ['enable', 'disable'], len: 1 }
    len?: IntegerRange;
};

const getMergeOption = (option?: StringOption) => {
    const res: Required<StringOption> = {
        charSet: option?.charSet ?? '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        len: parseIntegerRange(option?.len ?? '1-20')
    }
    return res;
}

export const genString = (option?: StringOption) => {
    const mergeOption = getMergeOption(option);
    return genArray<number>({
        len: mergeOption.len,
        type: BuiltInType.number,
        typeOption: {
            min: 0,
            max: mergeOption.charSet.length - 1,
            fixed: 0
        }
    }).map(index => mergeOption.charSet[index]).join('');
}
