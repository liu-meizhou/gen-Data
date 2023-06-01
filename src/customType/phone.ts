
import { genArray, registerGenerator } from "../index";
import { BuiltInType, GenData } from "../type";

const key = 'phone';

export interface PhoneOption {
};

type GenPhone = GenData<PhoneOption, string>;

export const genPhone: GenPhone = () => {
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

registerGenerator({
    [key]: genPhone
});
