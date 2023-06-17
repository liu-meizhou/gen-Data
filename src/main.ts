
// 以下是业务代码自己写的

import { genIdCard } from './customType/idCard';
import { genPhone } from './customType/phone';
import { useGenerator } from './index';

export const mock = useGenerator({
    phone: genPhone,
    idCard: genIdCard
});
