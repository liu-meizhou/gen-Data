import { getGenerators } from "./generator";
import { BuiltInType } from "./type";
import { genString } from "./type/string"

export const genBaseType = () => {
    return genString({
        charSet: ['boolean', 'number', 'string', 'dateTime'],
        len: 1
    }) as BuiltInType
};

export const genType = () => {
    return genString({
        charSet: getGenerators(),
        len: 1
    }) as BuiltInType
};
