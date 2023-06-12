import { GenData, IntegerRange } from "./type";
import { genBoolean } from "./type/boolean";
import { genDateTime } from "./type/dateTime";
import { genNumber } from "./type/number";
import { genObject } from "./type/object";
import { genString } from "./type/string";
import { genTree } from "./type/tree";
import { parseIntegerRange } from "./utils";

export type Mock = ReturnType<typeof useGenerator>;

export function useGenerator<T extends Record<string, GenData<any, any>>>(customFuncObj: T) {
    const baseType = {
        boolean: genBoolean,
        dateTime: genDateTime,
        number: genNumber,
        string: genString,
    }
    type ArrayOption = {
        len?: IntegerRange;
    } & GenOption[GenKey];
    function getArrayMergeOption(option?: ArrayOption) {
        const res = {
            len: parseIntegerRange(option?.len ?? '0-10'),
            type: option?.type || genBaseType(),  // 默认只能基础类型，防止无限循环
            // @ts-ignore
            typeOption: option?.typeOption
        }
        if (res.len < 0) {
            throw '数组的长度必须大于等于0'
        }
        return res;
    }
    function genArray(option?: ArrayOption) {
        const mergeOption = getArrayMergeOption(option);
        const res = [];
        for (let i = 0; i < mergeOption.len; i++) {
            res.push(gen(mergeOption.type, mergeOption.typeOption))
        }
        if (mergeOption.type === 'number') {
            console.log(mergeOption.typeOption);
            return res as Number[];
        }
        return res as string[];
    };
    const builtInFuncObj = {
        ...baseType,
        array: genArray,
        object: genObject,
        tree: genTree,
    };
    const funcObj = { ...builtInFuncObj, ...customFuncObj }
    type GenType = typeof funcObj;
    type GenKey = keyof GenType;
    type GenTypeParam = {
        [key in GenKey]: Parameters<GenType[key]>[0]
    }
    type GenTypeRes = {
        [key in GenKey]: ReturnType<GenType[key]>
    }
    type GenOption = {
        [key in GenKey]: {
            type?: key,
            typeOption?: GenTypeParam[key]
        }
    }

    const genFuncMap = new Map<GenKey, GenData<any, any>>();
    // 注册类型
    Object.entries(funcObj).forEach(([key, value]) => {
        // @ts-ignore
        genFuncMap.set(key, value);
    })

    const keys = () => {
        return Array.from(genFuncMap.keys());
    };

    const get = <T extends GenKey>(key: T) => genFuncMap.get(key) as GenType[T];

    const genBaseType = () => {
        return genString({
            charSet: Object.keys(baseType),
            len: 1
        }) as keyof typeof baseType
    };

    const genType = () => {
        return genString({
            charSet: keys() as string[],
            len: 1
        }) as GenKey
    };

    const gen = <T extends GenKey>(type?: T, option?: GenTypeParam[T]): GenTypeRes[T] => {
        const generator = get(type || genType());
        if (!generator) {
            throw `类型: ${type as string} 未注册`;
        }
        return generator(option);
    }

    return {
        ...builtInFuncObj,
        ...customFuncObj,
        get,
        genBaseType,
        genType,
        keys,
        gen,
    }
}
