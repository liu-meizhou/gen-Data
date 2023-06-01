import { registerGenerator } from "src/generator";
import { BuiltInType, GenData } from "src/type";

export interface NumberOption {
    min?: number;
    max?: number;
    fixed?: number
};

type GenNumber = GenData<NumberOption, number>;

const getMergeOption = (option?: NumberOption) => {
    const min = option?.min ?? genNumber({ min: -100, max: 100 })
    const res: Required<NumberOption> = {
        min,
        max: option?.max ?? genNumber({ min, max: (min + 100) }),
        fixed: option?.fixed ?? genNumber({ min: 0, max: 6, fixed: 0 })
    }
    return res;
}

export const genNumber: GenNumber = (option) => {
    const mergeOption = getMergeOption(option);
    return parseFloat((mergeOption.min + Math.random() * (mergeOption.max - mergeOption.min)).toFixed(mergeOption.fixed));
}

registerGenerator({
    [BuiltInType.number]: genNumber
})

