
// 生成器全部要满足传入一个参数，返回一个值
export type GenData<T, R> = (option?: T) => R;

export type IntegerRange = number | string | {
    min: number;
    max: number;
}

// 时间数据类型
export enum DateType {
    number = 'number',
    string = 'string'
}
