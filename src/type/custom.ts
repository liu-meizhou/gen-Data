import { getGenerator, registerGenerator } from "src/generator";
import { BuiltInType, GenData } from "src/type";
import { genType } from "src/utils";

export interface CustomOption {
    custom?: string | GenData<any, any>;
    [key: string]: any;
};

type GenCustom = GenData<CustomOption, any>;

const getMergeOption = (option?: CustomOption) => {
    const res: Required<CustomOption> = {
        custom: option?.custom ?? genType(),
    }
    return res;
}

export const genCustom: GenCustom = (option) => {
    const mergeOption = getMergeOption(option);
    if (typeof mergeOption.custom === 'function') {
        return mergeOption.custom(mergeOption);
    }
    const generator = getGenerator(mergeOption.custom);
    return generator ? generator(mergeOption) : `类型${mergeOption.custom}不存在`;
}

registerGenerator({
    [BuiltInType.custom]: genCustom
})
