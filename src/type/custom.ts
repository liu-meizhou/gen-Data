import { getGenerator } from "../index";
import { GenData } from "src/type";
import { genType } from "src/utils";

export interface CustomOption {
    custom?: string | GenData<any, any>;
    [key: string]: any;
};

const getMergeOption = (option?: CustomOption) => {
    const res: Required<CustomOption> = {
        custom: option?.custom ?? genType(),
    }
    return res;
}

export const genCustom = (option?: CustomOption) => {
    const mergeOption = getMergeOption(option);
    if (typeof mergeOption.custom === 'function') {
        return mergeOption.custom(mergeOption);
    }
    const generator = getGenerator(mergeOption.custom);
    if (!generator) {
        throw `类型：${mergeOption.custom} 未注册`;
    }
    return generator(option);
}
