import { IntegerRange } from "src/type";
import { parseIntegerRange } from "../utils";
import { genObject, ObjectOption } from './object';

export type TreeOption = {
    childrenKey?: string;
    childrenLen?: IntegerRange;
    childrenLayer?: IntegerRange;
} & ObjectOption;

const getMergeOption = (option?: TreeOption) => {
    return {
        childrenKey: option?.childrenKey || 'children',
        childrenLen: parseIntegerRange(option?.childrenLen ?? '2-4')
    };
}

export const genTree = (option?: TreeOption) => {
    const childrenLayer = parseIntegerRange(option?.childrenLayer ?? '3-6');
    const res = genObject(option);
    const mergeOption = getMergeOption(option);
    res[mergeOption.childrenKey] = [];
    if (childrenLayer < 1) {
        return res;
    }
    for (let i = 0; i < mergeOption.childrenLen; i++) {
        res[mergeOption.childrenKey].push(genTree(Object.assign(option || {}, {
            childrenLayer: childrenLayer - 1
        })));
    }
    return res;
}
