
// 以下是业务代码自己写的

import { genIdCard } from './customType/idCard';
import { genPhone } from './customType/phone';
import { registerGenerator } from './generator';

export enum CustomGenType {
    phone = 'phone',
    idCard = 'idCard',
}

registerGenerator({
    [CustomGenType.phone]: genPhone,
    [CustomGenType.idCard]: genIdCard
});
