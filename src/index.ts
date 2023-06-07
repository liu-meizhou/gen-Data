import { getGenerator, registerGenerator } from './generator';
import { BuiltInOption, BuiltInType } from "./type";
import { genArray } from "./type/array";
import { genBoolean } from './type/boolean';
import { genCustom } from './type/custom';
import { genDateTime } from './type/dateTime';
import { genNumber } from './type/number';
import { genObject } from './type/object';
import { genString } from './type/string';
import { genTree } from './type/tree';
import { genType } from './utils';

export function genData (option?: BuiltInOption) {
    const generator = getGenerator(option?.type || genType());
    if (!generator) {
        throw `类型 ${option?.type} 未注册`;
    }
    return generator(option?.typeOption);
}

export function init () {
    registerGenerator({
        [BuiltInType.array]: genArray,
        [BuiltInType.boolean]: genBoolean,
        [BuiltInType.dateTime]: genDateTime,
        [BuiltInType.number]: genNumber,
        [BuiltInType.object]: genObject,
        [BuiltInType.string]: genString,
        [BuiltInType.custom]: genCustom,
        [BuiltInType.tree]: genTree
    });
}

export * from "./type/array";
export * from "./type/boolean";
export * from "./type/number";
export * from "./type/object";
export * from "./type/string";
export * from "./type/custom";
export * from "./type/dateTime";
export * from "./type/tree";
export * from "./generator";
