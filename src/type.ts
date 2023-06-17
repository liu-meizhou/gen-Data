
import { ArrayOption, BooleanOption, CustomOption, DateTimeOption, NumberOption, ObjectOption, StringOption, TreeOption } from "./index";

// 生成器全部要满足传入一个参数，返回一个值
export type GenData<T, R> = (options?: T) => R;

export type IntegerRange = number | string | {
    min: number;
    max: number;
}

// 内置类型
export enum BuiltInType {
    array = 'array',
    boolean = 'boolean',
    custom = 'custom',
    dateTime = 'dateTime',
    number = 'number',
    object = 'object',
    string = 'string',
    tree = 'tree',
}

export type BuiltInOption = ArrayType | BooleanType | CustomType | DateTimeType | NumberType | ObjectType | StringType | TreeType;

export interface ArrayType {
    type?: BuiltInType.array,
    typeOption?: ArrayOption
}

export interface BooleanType {
    type?: BuiltInType.boolean,
    typeOption?: BooleanOption
}

export interface CustomType {
    type?: BuiltInType.custom,
    typeOption?: CustomOption
}

export interface DateTimeType {
    type?: BuiltInType.dateTime,
    typeOption?: DateTimeOption
}

export interface NumberType {
    type?: BuiltInType.number,
    typeOption?: NumberOption
}

export interface ObjectType {
    type?: BuiltInType.object,
    typeOption?: Array<ObjectOption>
}

export interface StringType {
    type?: BuiltInType.string,
    typeOption?: StringOption
}

export interface TreeType {
    type?: BuiltInType.tree,
    typeOption?: TreeOption
}

