
import { genArray } from "../index";
import { BuiltInType } from "../type";

export interface PhoneOption {
    aaa: string;
};

export const genPhone = (option?: PhoneOption) => {
    return `1${genArray({
        len: 10,
        type: BuiltInType.number,
        typeOption: {
            min: 0,
            max: 9,
            fixed: 0
        }
    }).join('')}`
}
