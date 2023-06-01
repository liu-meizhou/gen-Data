import { registerGenerator } from "src/generator";
import { BuiltInType, GenData } from "src/type";
import { genArray } from "./array";
import { genNumber } from "./number";

export interface StringOption {
    charSet?: string | string[]; // string[] 的场景是我要在 enable 和 disable 中生成一个，可以配置 { charSet: ['enable', 'disable'], len: 1 }
    len?: number;
};

type GenString = GenData<StringOption, string>;

const getMergeOption = (option?: StringOption) => {
    const res: Required<StringOption> = {
        charSet: option?.charSet ?? '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        len: option?.len ?? genNumber({ min: 1, max: 10, fixed: 0 })
    }
    return res;
}

export const genString: GenString = (option) => {
    const mergeOption = getMergeOption(option);
    return genArray({
        len: mergeOption.len,
        type: BuiltInType.number,
        typeOption: {
            min: 0,
            max: mergeOption.charSet.length - 1,
            fixed: 0
        }
    }).map(item => mergeOption.charSet[item]).join('');
}

registerGenerator({
    [BuiltInType.string]: genString
})
