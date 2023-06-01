import { getGenerator, registerGenerator } from "src/generator";
import { GenData, BuiltInOption, BuiltInType } from "src/type";
import { genBaseType } from "src/utils";
import { genNumber } from "./number";

export type ArrayOption = {
    len?: number;
} & BuiltInOption;

type GenArray = GenData<ArrayOption, Array<any>>;

const getMergeOption = (option?: ArrayOption) => {
    const res: Required<ArrayOption> = {
        len: option?.len ?? genNumber({ min: 1, max: 10, fixed: 0 }),
        type: option?.type || genBaseType(),
        // @ts-ignore
        typeOption: option?.typeOption
    }
    return res;
}

export const genArray: GenArray = (option) => {
    const mergeOption = getMergeOption(option);
    const generator = getGenerator(mergeOption.type);
    if (!generator) {
        return [];
    }
    const res = [];
    for (let i = 0; i < mergeOption.len; i++) {
        res.push(generator(mergeOption.typeOption))
    }
    return res;
}

registerGenerator({
    [BuiltInType.array]: genArray
})
