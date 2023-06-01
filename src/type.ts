
import { ArrayOption, BooleanOption, DateTimeOption, NumberOption, ObjectOption, StringOption } from "./index";
import { CustomOption } from "./type/custom";

export type GenData<T, R> = (options?: T) => R;

// 内置类型
export enum BuiltInType {
    array = 'array',
    boolean = 'boolean',
    custom = 'custom',
    dateTime = 'dateTime',
    number = 'number',
    object = 'object',
    string = 'string'
}

// 时间数据类型
export enum DateType {
    number = 'number',
    string = 'string'
}

export type BuiltInOption = ArrayType | BooleanType | CustomType | DateTimeType | NumberType | ObjectType | StringType;

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

