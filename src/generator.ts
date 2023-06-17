import { BuiltInOption, BuiltInType, GenData } from "./type";
import { genArray } from "./type/array";
import { genBoolean } from './type/boolean';
import { genCustom } from './type/custom';
import { genDateTime } from './type/dateTime';
import { genNumber } from './type/number';
import { genObject } from './type/object';
import { genString } from './type/string';
import { genTree } from './type/tree';
import { genType } from "./utils";

const genFuncMap = new Map<string, GenData<any, any>>();

export const getGenerators = () => {
    return Array.from(genFuncMap.keys());
};

export const getGenerator = (key: string) => genFuncMap.get(key);

export function genData (option?: BuiltInOption) {
    const generator = getGenerator(option?.type || genType());
    if (!generator) {
        throw `类型 ${option?.type} 未注册`;
    }
    return generator(option?.typeOption);
}

export const useGenerator = <T extends Record<string, GenData<any, any>>>(customFuncObj: T) => {
    const funcObj = {
        [BuiltInType.array]: genArray,
        [BuiltInType.boolean]: genBoolean,
        [BuiltInType.dateTime]: genDateTime,
        [BuiltInType.number]: genNumber,
        [BuiltInType.object]: genObject,
        [BuiltInType.string]: genString,
        [BuiltInType.custom]: genCustom,
        [BuiltInType.tree]: genTree,
        ...customFuncObj,
    }
    Object.entries(funcObj).forEach(([key, value]) => {
        genFuncMap.set(key, value);
    });

    return {
        ...funcObj,
        gen: genData
    }
}
