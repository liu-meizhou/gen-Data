import { getGenerator, registerGenerator } from "src/generator";
import { GenData, BuiltInOption, BuiltInType } from "src/type";
import { genBaseType } from "src/utils";
import { genNumber } from "./number";
import { genString } from "./string";

export type ObjectOption = {
    key?: string;  // object的key值
} & BuiltInOption;

type GenObject = GenData<Array<ObjectOption>, Record<string, any>>;

const getMergeOption = (option?: Array<ObjectOption>) => {
    return option ?? Array.from({ length: genNumber({ min: 1, max: 10, fixed: 0 }) });
}

const getMergeOptionItem = (option?: ObjectOption) => {
    const res: Required<ObjectOption> = {
        key: option?.key || genString({ len: 6 }),
        type: option?.type || genBaseType(),
        // @ts-ignore
        typeOption: option?.typeOption
    }
    return res;
}

export const genObject: GenObject = (option) => {
    const res = {} as Record<string, any>;
    const mergeOption = getMergeOption(option);
    mergeOption.forEach(itemOpt => {
        const mergeOption = getMergeOptionItem(itemOpt);
        const generator = getGenerator(mergeOption.type);
        res[mergeOption.key] = generator ? generator(mergeOption.typeOption) : `类型${mergeOption.type}不存在`;
    });
    return res;
}

registerGenerator({
    [BuiltInType.object]: genObject
})

